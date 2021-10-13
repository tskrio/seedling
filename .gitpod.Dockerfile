FROM gitpod/workspace-full:latest

RUN bash -c ". .nvm/nvm.sh     && nvm install 14.x     && nvm use 14.x     && nvm alias default 14.x"

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
