#!/bin/bash

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | lolcat
}

install_packages() {
    local package=$1
    if ! command -v "$package" &> /dev/null; then
        log "$package is not installed. Installing $package..."
        sudo apt-get update && sudo apt-get install -y "$package"
        if [ $? -ne 0 ]; then
            log "Error: Failed to install $package."
            exit 1
        fi
    else
        log "$package is already installed."
    fi
}

check_mysql_running() {
    log "Checking if MySQL service is running..."
    if ! sudo systemctl is-active --quiet mysql; then
        log "MySQL service is not running. Starting MySQL service..."
        sudo systemctl start mysql
        if [ $? -ne 0 ]; then
            log "Error: Failed to start MySQL service."
            exit 1
        fi
    else
        log "MySQL service is already running."
    fi
}

create_mysql_user() {
    log "Checking if MySQL user 'Main_user' exists..."
    USER_EXISTS=$(sudo mysql -u root -e "SELECT EXISTS(SELECT 1 FROM mysql.user WHERE user = 'Main_user' AND host = 'localhost');" | grep -o "1")
    if [ "$USER_EXISTS" != "1" ]; then
        log "MySQL user 'Main_user' does not exist. Creating user..."
        sudo mysql -u root <<MYSQL_SCRIPT
CREATE USER 'Main_user'@'localhost' IDENTIFIED BY 'your_password';
MYSQL_SCRIPT
        if [ $? -ne 0 ]; then
            log "Error: Failed to create MySQL user 'Main_user'."
            exit 1
        fi
        log "MySQL user 'Main_user' created successfully."
    else
        log "MySQL user 'Main_user' already exists."
    fi
}

grant_mysql_privileges() {
    check_mysql_running
    create_mysql_user
    log "Granting MySQL privileges for Main_user on nodejs_login database..."
    sudo mysql -u root <<MYSQL_SCRIPT
GRANT ALL PRIVILEGES ON nodejs_login.* TO 'Main_user'@'localhost';
FLUSH PRIVILEGES;
MYSQL_SCRIPT
    if [ $? -ne 0 ]; then
        log "Error: Failed to grant MySQL privileges."
        exit 1
    fi
    log "MySQL privileges granted successfully."
}

# Rest of your script...

show_header() {
    echo "====================================" | lolcat
    figlet -c Sepio Installer | lolcat
    echo "====================================" | lolcat
}

# Main script execution starts here

show_header

log "Starting setup script..."

install_packages figlet
install_packages lolcat
install_packages git
install_packages jq
install_packages expect

SCRIPT_DIR=$(dirname "$(realpath "$0")")
SEPIO_APP_DIR="$SCRIPT_DIR/Sepio-App"

log "Installing npm and dependencies..."
install_npm
install_frontend_dependencies "$SEPIO_APP_DIR/front-end"
install_backend_dependencies "$SEPIO_APP_DIR/backend"
install_nvm

log "Checking for required Node.js versions from package.json files..."
backend_node_version=$(get_required_node_version "$SEPIO_APP_DIR/backend/package.json")
log "Required Node.js version for backend: $backend_node_version"
if [ "$backend_node_version" == "null" ]; then
    log "Error: Required Node.js version for backend not specified in package.json."
    exit 1
fi
install_node_version "$backend_node_version"

frontend_node_version=$(get_required_node_version "$SEPIO_APP_DIR/front-end/package.json")
log "Required Node.js version for frontend: $frontend_node_version"
if [ "$frontend_node_version" == "null" ]; then
    log "Error: Required Node.js version for frontend not specified in package.json."
    exit 1
fi
install_node_version "$frontend_node_version"

log "Installing latest eslint-webpack-plugin..."
npm install eslint-webpack-plugin@latest --save-dev

log "Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    log "Error: Failed to generate Prisma Client."
    exit 1
fi
log "Prisma Client generated successfully."

log "Granting MySQL privileges..."
grant_mysql_privileges

log "Creating systemd service for React build..."
sudo bash -c "cat <<EOL > /etc/systemd/system/react-build.service
[Unit]
Description=React Build Service
After=network.target

[Service]
Type=oneshot
ExecStart=/bin/bash -c 'cd $SEPIO_APP_DIR/front-end && npm run build'
User=$USER
Environment=PATH=$PATH:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=$SEPIO_APP_DIR/front-end

[Install]
WantedBy=multi-user.target
EOL"
if [ $? -ne 0 ]; then
    log "Error: Failed to create react-build.service."
    exit 1
fi

log "Creating systemd service for server.js..."
sudo bash -c "cat <<EOL > /etc/systemd/system/node-server.service
[Unit]
Description=Node.js Server
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash -c 'cd $SEPIO_APP_DIR/backend && node server.js'
User=$USER
Environment=PATH=$PATH:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=$SEPIO_APP_DIR/backend

[Install]
WantedBy=multi-user.target
EOL"
if [ $? -ne 0 ]; then
    log "Error: Failed to create node-server.service."
    exit 1
fi

log "Reloading systemd daemon to pick up the new service files..."
sudo systemctl daemon-reload
if [ $? -ne 0 ]; then
    log "Error: Failed to reload systemd daemon."
    exit 1
fi

log "Enabling react-build.service to start on boot..."
sudo systemctl enable react-build.service
if [ $? -ne 0 ]; then
    log "Error: Failed to enable react-build.service."
    exit 1
fi

log "Starting react-build.service... Please be patient, don't break up the process..."
sudo systemctl start react-build.service
if [ $? -ne 0 ]; then
    log "Error: Failed to start react-build.service."
    exit 1
fi

log "Enabling node-server.service to start on boot..."
sudo systemctl enable node-server.service
if [ $? -ne 0 ]; then
    log "Error: Failed to enable node-server.service."
    exit 1
fi

log "Starting node-server.service..."
sudo systemctl start node-server.service
if [ $? -ne 0 ]; then
    log "Error: Failed to start node-server.service."
    exit 1
fi

log "Systemd services setup completed successfully."

log "Granting privileges for Updater and scheduling autoupdates..."
schedule_updater
cd "$SCRIPT_DIR" || { log "Error: Directory $SCRIPT_DIR not found."; exit 1; }
chmod +x Sepio_Updater.sh
sudo touch /var/log/sepio_updater.log
sudo chown "$USER:$USER" /var/log/sepio_updater.log

check_port_availability 3000
log "Setup script executed successfully."
