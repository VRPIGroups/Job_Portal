pipeline {
   agent any
   tools {
       nodejs 'Node18'
   }
   environment {
       REGISTRY = 'yourdockerhubusername'   // replace with your Docker Hub username
       EC2_HOST = 'YOUR_EC2_IP'             // replace with your EC2 public IP or hostname
   }
   stages {
       stage('Checkout') {
           steps {
               checkout scm
           }
       }
       stage('Build & Test') {
           parallel {
               stage('Frontend') {
                   steps {
                       dir('frontend') {
                           sh 'npm ci'
                           sh 'npm run lint'
                           sh 'npm run build'
                       }
                   }
               }
               stage('Backend') {
                   steps {
                       dir('backend') {
                           sh 'npm ci'
                           sh 'npm run lint'
                           // no build step - plain JS, no tests configured yet
                       }
                   }
               }
               stage('Admin Panel') {
                   steps {
                       dir('admin-panel') {
                           sh 'npm ci'
                           sh 'npm run lint'
                           sh 'npm run build'
                       }
                   }
               }
           }
       }
       stage('Docker Login') {
           steps {
               withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                   sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
               }
           }
       }
       stage('Docker Build & Push') {
           steps {
               script {
                   def services = ['frontend', 'backend', 'admin-panel']
                   services.each { svc ->
                       dir(svc) {
                           sh "docker build -t ${REGISTRY}/${svc}:${env.BUILD_NUMBER} -t ${REGISTRY}/${svc}:latest ."
                           sh "docker push ${REGISTRY}/${svc}:${env.BUILD_NUMBER}"
                           sh "docker push ${REGISTRY}/${svc}:latest"
                       }
                   }
               }
           }
       }
       stage('Deploy to EC2') {
           steps {
               sshagent(credentials: ['ec2-ssh-key']) {
                   sh """
                       ssh -o StrictHostKeyChecking=no ec2-user@${EC2_HOST} '
                           docker pull ${REGISTRY}/backend:latest &&
                           docker stop backend || true &&
                           docker rm backend || true &&
                           docker run -d --name backend -p 5000:5000 ${REGISTRY}/backend:latest &&
                           docker pull ${REGISTRY}/frontend:latest &&
                           docker stop frontend || true &&
                           docker rm frontend || true &&
                           docker run -d --name frontend -p 80:80 ${REGISTRY}/frontend:latest &&
                           docker pull ${REGISTRY}/admin-panel:latest &&
                           docker stop admin-panel || true &&
                           docker rm admin-panel || true &&
                           docker run -d --name admin-panel -p 8080:80 ${REGISTRY}/admin-panel:latest
                       '
                   """
               }
           }
       }
       stage('Verify Deployment') {
           steps {
               sh '''
                   sleep 5
                   curl -f http://${EC2_HOST}:80 || exit 1
                   curl -f http://${EC2_HOST}:8080 || exit 1
                   curl -f http://${EC2_HOST}:5000/health || exit 1
               '''
           }
       }
   }
   post {
       success {
           echo 'Pipeline succeeded — build, push, and deploy all completed.'
       }
       failure {
           echo 'Pipeline failed — check the stage logs above.'
       }
       always {
           cleanWs()
       }
   }
}
