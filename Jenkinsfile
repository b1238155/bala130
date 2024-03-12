pipeline {
    agent any 

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/b1238155/bala121.git'
            }
        }

        stage('Install NVM') {
            steps {
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash'
            }
        }
    }
}
