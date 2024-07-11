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

install_nvm() {
    if ! command -v nvm &> /dev/null; then
        log "nvm (Node Version Manager) is not installed. Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        log "nvm installed successfully."
    else
        log "nvm is already installed."
    fi
}

install_npm() {
    if ! command -v npm &> /dev/null; then
        log "npm is not installed. Installing npm..."
        sudo apt-get update && sudo apt-get install -y npm
        if [ $? -ne 0 ]; then
            log "Error: Failed to install npm."
            exit 1
        fi
        log "npm installed successfully."
    else
        log "npm is already installed."
    fi
}

install_prisma() {
    if ! command -v prisma &> /dev/null; then
        log "Prisma CLI is not installed. Installing Prisma CLI..."
        npm install -g prisma
        if [ $? -ne 0 ]; then
            log "Error: Failed to install Prisma CLI."
            exit 1
        fi
        log "Prisma CLI installed successfully."
    else
        log "Prisma CLI is already installed."
    fi
}

setup_prisma() {
    log "Initializing Prisma migrations..."
    prisma migrate dev --name init --preview-feature
    if [ $? -ne 0 ]; then
        log "Error: Failed to run Prisma migrations."
        exit 1
    fi
    log "Prisma migrations applied successfully."
}

setup_database() {
    local database_url="mysql://Main_user:Sepio_password@localhost:3306/nodejs_login"

    log "Setting up database..."
    export DATABASE_URL="$database_url"
    prisma db push --schema=prisma/schema.prisma --preview-feature
    if [ $? -ne 0 ]; then
        log "Error: Failed to push Prisma schema to database."
        exit 1
    fi
    log "Database setup completed successfully."
}

install_dependencies() {
    local backend_dir=$1

    log "Installing backend dependencies in $backend_dir..."
    cd "$backend_dir" || { log "Error: Directory $backend_dir not found."; exit 1; }
    npm install
    if [ $? -ne 0 ]; then
        log "Error: Failed to install backend dependencies."
        exit 1
    fi
    log "Backend dependencies installed successfully."
}

setup_services() {
    local backend_dir=$1

    log "Creating systemd service for server.js..."
    sudo bash -c "cat <<EOL > /etc/systemd/system/node-server.service
[Unit]
Description=Node.js Server
After=network.target

[Service]
Type=simple
ExecStart=/bin/bash -c 'cd $backend_dir && node server.js'
User=$USER
Environment=PATH=$PATH:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=$backend_dir

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
install_prisma

install_nvm

log "Checking for required Node.js versions from package.json files..."
backend_node_version=$(jq -r '.engines.node // "16"' "$SEPIO_APP_DIR/backend/package.json")
log "Required Node.js version for backend: $backend_node_version"
if [ "$backend_node_version" == "null" ]; then
    log "Error: Required Node.js version for backend not specified in package.json."
    exit 1
fi
install_node_version "$backend_node_version"

log "Installing backend dependencies and setting up Prisma..."
install_dependencies "$SEPIO_APP_DIR/backend"
setup_prisma
setup_database

setup_services "$SEPIO_APP_DIR/backend"

log "Setup script executed successfully."
