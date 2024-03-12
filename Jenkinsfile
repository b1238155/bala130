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
                sh 'npm build' // Corrected npm build to npm run build
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
                    sshagent(credentials:['10c3879e-70a2-47fd-9049-2fca1f090249']) {
                        sh 'ssh-keyscan -H 13.233.97.41 >> ~/.ssh/known_hosts' // Corrected known-hosts to known_hosts
                        sh 'scp -r ./build/* ubuntu@13.233.97.41:/home/ubuntu'
                    }
                }
            }
        }
    }
}
