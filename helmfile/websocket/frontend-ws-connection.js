export const ws = webSocket<WebsocketMessage>(`wss://${location.hostname}:${location.protocol === 'https:' ? 443 : 80}/ws/`);

export const wsObserver = ws
  .pipe(
    retryWhen(errors =>
      errors.pipe(
        delay(1000)
      )
    )
  );

wsObserver.subscribe(console.log);