import { Component, OnInit, ChangeDetectorRef, Input, Output } from "@angular/core";
import WaveSurfer from 'wavesurfer.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
import Microphone from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.min.js';
import { EventEmitter } from 'events';

@Component({
    selector: "wave-control",
    templateUrl: './wave.component.html',
    styleUrls:['./wave.component.css']
})
export class WaveComponent implements OnInit {

    @Input()
    public customerId:string;
    @Output()
    public UploadFileClick: EventEmitter = new EventEmitter();
    public file_blb: Blob;
    public file_blb_Subscriber;
    public wavesurfer;
    public microphone;

    //sample audio
    url = "https://ia800508.us.archive.org/15/items/LoveThemeFromTheGodfather/02LoveThemeFromTheGodfather.mp3";

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.wavesurfer = WaveSurfer.create({
            container: '#wf_container',
            waveColor: 'violet',
            progressColor: 'purple',
            plugins: [
                TimelinePlugin.create({
                    container: '#wf-timeline'
                }),
                Microphone.create()
            ]
        });

        this.wavesurfer.on('ready', () => {        
             
         });

         //load test file 
        this.wavesurfer.load(this.url);

        //load blob file from Api
        //this.file_blb_Subscriber = this.dataService.getAudioFile(this.customerId);

            // this.file_blb_Subscriber.subscribe(data =>{
            //     debugger;
            //     this.file_blb = data;
            //     this.wavesurfer.loadBlob(this.file_blb);
            //   },
            //   err =>{
            //     if(err instanceof HttpErrorResponse)
            //     {        
            //       console.log(err.message);
            //     }
            //   });

        //microphone events
        this.wavesurfer.microphone.on('deviceReady', function (stream) {
            console.log('Device ready!', stream);
        });
        this.wavesurfer.microphone.on('deviceError', function (code) {
            console.warn('Device error: ' + code);
        });
        
    };

    //Audio Navigation Methods
    Play()
    {
        this.wavesurfer.play();
    }
    Pause()
    {
        this.wavesurfer.pause();
    }
    Stop()
    {
        this.wavesurfer.stop();
    }
    
    Mute(){
        this.wavesurfer.toggleMute();
    }

    isMute(){
        return this.wavesurfer.getMute();
    }

    startMic() {

        // start the microphone
        this.wavesurfer.microphone.start();
    }

    stopMic() {

        // start the microphone
        this.wavesurfer.microphone.stop();

        // resume playing
        this.wavesurfer.play();

    }

    change(){
        
    }

}