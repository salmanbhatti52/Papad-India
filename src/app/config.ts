import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Headers } from '@angular/http';

declare var oauthSignature: any;
var headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');


@Injectable({
    providedIn: 'root',
})
export class Config {

    url: any;
    consumerKey: any;
    consumerSecret: any;
    avatar: any = "assets/image/shop-icon.jpg";
    oauth: any;
    signedUrl: any;
    randomString: any;
    oauth_nonce: any;
    oauth_signature_method: any;
    encodedSignature: any;
    searchParams: any;
    customer_id: any;
    params: any;
    options: any = {};
    optionstwo: any = {};
    lang: any = 'en';
    constructor() {

        // this.url = 'https://headhunterssmokeshop.com/';
        // this.consumerKey = 'ck_6f5f858bdaf13458dca896ef62d58c4bfda2fed5';
        // this.consumerSecret = 'cs_680d821c15f0d1ef472d4fab29f4a4dcd3f87831';

        this.url = 'https://papadindia.com/';
        this.consumerKey = 'ck_29d08e77b3e9fb13dc8f3a6ee11220b6bb37dcef';
        this.consumerSecret = 's_5cf856bdb9e17d4d2c6f61403095ee41b8d172ea';

        // this.url = 'https://i-nutrition.ro/';
        // this.consumerKey = 'ck_1dcf1dc6b10a8db2e4c79f74f8a2d5023fc5dbef';
        // this.consumerSecret = 'cs_2ff8198573373e070519c195bb0ea09394ceaf15';

        this.options.withCredentials = true;
        this.options.headers = {};
        this.optionstwo.withCredentials = false;
        this.optionstwo.headers = {};
        this.oauth = oauthSignature;
        this.oauth_signature_method = 'HMAC-SHA1';
        this.searchParams = new URLSearchParams();
        this.params = {};
        this.params.oauth_consumer_key = this.consumerKey;
        this.params.oauth_signature_method = 'HMAC-SHA1';
        this.params.oauth_version = '1.0';
    }
    setOauthNonce(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }
    setUrl(method, endpoint, filter) {
        var key;
        var unordered = {};
        var ordered = {};
        if (this.url.indexOf('https') >= 0) {
            unordered = {};
            if (filter) {
                for (key in filter) {
                    unordered[key] = filter[key];
                }
            }
            unordered['consumer_key'] = this.consumerKey;
            unordered['consumer_secret'] = this.consumerSecret;
            unordered['lang'] = this.lang;
            Object.keys(unordered).sort().forEach(function (key) {
                ordered[key] = unordered[key];
            });
            this.searchParams = new URLSearchParams();
            for (key in ordered) {
                this.searchParams.set(key, ordered[key]);
            }
            return this.url + '/wp-json/wc/v3/' + endpoint + this.searchParams.toString();
        }
        else {
            var url = this.url + '/wp-json/wc/v3/' + endpoint;
            this.params['oauth_consumer_key'] = this.consumerKey;
            this.params['oauth_nonce'] = this.setOauthNonce(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            this.params['oauth_timestamp'] = new Date().getTime() / 1000;
            for (key in this.params) {
                unordered[key] = this.params[key];
            }
            if (filter) {
                for (key in filter) {
                    unordered[key] = filter[key];
                }
            }
            unordered['lang'] = this.lang;
            Object.keys(unordered).sort().forEach(function (key) {
                ordered[key] = unordered[key];
            });
            this.searchParams = new URLSearchParams();
            for (key in ordered) {
                this.searchParams.set(key, ordered[key]);
            }
            this.encodedSignature = this.oauth.generate(method, url, this.searchParams.toString(), this.consumerSecret);
            return this.url + '/wp-json/wc/v3/' + endpoint + this.searchParams.toString() + '&oauth_signature=' + this.encodedSignature;
        }
    }
}