declare const $: any;

export class PartyController {

    constructor() {

        $('#map-container .map').on('click', e => {
            window.open('https://www.google.com.tw/maps/place/%E8%B1%AA%E9%BC%8E%E9%A3%AF%E5%BA%97+%E5%8C%97%E6%96%B0%E6%97%97%E8%89%A6%E9%A4%A8/@24.984038,121.5379173,17z/data=!3m1!4b1!4m5!3m4!1s0x346801fed70ad06d:0x2b2b0cae3db1b50c!8m2!3d24.984038!4d121.540106', '_blank');
        })
    }
}