pipeline {
    agent any

    // Define tools to be used in the pipeline
    tools {
        nodejs 'nodejs' // Example: Node.js tool installation named 'nodejs'
    }

    stages {
        stage('Install Nginx') {
            steps {
                // Execute sudo commands to install Nginx
                sh 'sudo apt update'
                sh 'sudo apt install nginx -y'
            }
        }
    }
}
