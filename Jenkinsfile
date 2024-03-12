pipeline {
    agent any 

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('checkout') {
            steps {
                git branch: 'main' , url: 'https://github.com/b1238155/bala121.git'
            }
        }
    }
}
