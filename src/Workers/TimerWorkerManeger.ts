let instance: TimerWorkerManeger | null = null;

export class TimerWorkerManeger {
  private worker: Worker;
  private constructor() {
    this.worker = new Worker(new URL("./timerWorker.js", import.meta.url));
  }
  static getInstance() {
    if (!instance) {
      instance = new TimerWorkerManeger();
    }
    return instance;
  }
  postMessage(message: any){
    this.worker.postMessage(message)
  }
  onmessage(cb: (e:MessageEvent)=>void){
    this.worker.onmessage = cb
  }
  terminate(){
    this.terminate()
    instance = null
  }
}
