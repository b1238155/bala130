pipeline {
    agent any

    stages {
        stage('Create Directory') {
            steps {
                // Create a directory named 'nginx_config' in the workspace
                sh 'mkdir nginx_config'
                
                // Optionally, you can navigate into the directory
                dir('nginx_config') {
                    // Execute commands within the created directory
                    // For example, create a new configuration file
                    sh 'touch nginx.conf'
                }
            }
        }
        
        stage('Install Nginx') {
            steps {
                // Install Nginx using the package manager
                sh 'sudo apt update'
                sh 'sudo apt install nginx -y'
            }
        }
    }
}
