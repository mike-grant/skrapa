FROM zenika/alpine-chrome:with-node

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
WORKDIR /usr/src/app
COPY --chown=chrome package.json yarn.lock ./
RUN yarn
COPY --chown=chrome . ./
ENTRYPOINT ["tini", "--"]
EXPOSE 4000
CMD ["node", "/usr/src/app/src/main"]