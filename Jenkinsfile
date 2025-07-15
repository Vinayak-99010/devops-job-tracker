pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/Vinayak-99010/devops-job-tracker.git'
      }
    }
    stage('Build') {
      steps {
        sh 'docker-compose build'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d'
      }
    }
  }
}
