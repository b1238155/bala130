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

        stage('Install app dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'mkdir -p ~/.ssh'
                    sshagent(credentials:['e2ef3ca2-72c0-4224-9924-4d660538e9a2']) {
                        sh 'ssh-keyscan -H 13.233.97.41 >> ~/.ssh/known-hosts'
                        sh 'scp -r ./build/* ubuntu@13.233.97.41:/home/ubuntu'
                    }
                }
            }
        }
    }
}
                    
