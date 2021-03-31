

(function() {


    let textInput = document.getElementById('input');

    

    var output = PUBNUB.$('output'), 
        input = PUBNUB.$('input'), 
        button = PUBNUB.$('button'),
        avatar = PUBNUB.$('avatar')

    var channel = 'mchat';
    
    // Assign a random avatar in random color
    avatar.className = 'face-' + ((Math.random() * 13 + 1) >>> 0) + ' color-' + ((Math.random() * 10 + 1) >>> 0);

    var p = PUBNUB.init({
        subscribe_key: 'sub-c-1d799376-85b5-11eb-a47e-8aa5932e3236',
        publish_key:   'pub-c-c3564aa2-a04d-4ab0-bed3-93a42c77e870'
    });

    p.subscribe({
        channel  : channel,
        callback : function(m) {
            if(m.href == undefined){
                output.innerHTML = '<p><i class="' + m.avatar + '"></i><span>' +  m.text.replace( /[<>]/ig, '' ) + '</span></p>' + output.innerHTML;
            }
        }
    });

    p.bind('keyup', input, function(e) {
        (e.keyCode || e.charCode) === 13 && publish()
    });

    p.bind('click', button, publish);

    function publish() {
        if(textInput.value.length > 0){
            p.publish({
                channel : channel, 
                message : {avatar: avatar.className, text: input.value}, 
                x : (input.value='')
            });
        };
    }


    

})();

var linkValue;
var currentStyleSheet1 = document.getElementById('styleSheet1');
var currentStyleSheet2 = document.getElementById('styleSheet2');

function imageUpload(){
		
	if(localStorage.getItem("theme") == "light"){
		currentStyleSheet1.href = window.location.href + "css/style.css";
		currentStyleSheet2.href = window.location.href + "css/imgur.min.css";
		localStorage.setItem("theme", "light");
	}else if(localStorage.getItem("theme") == "dark"){
		currentStyleSheet1.href = window.location.href + "css/style.dark.css";
		currentStyleSheet2.href = window.location.href + "css/imgur.min.dark.css";
		localStorage.setItem("theme", "dark");		
    }
    
    
    let textInput = document.getElementById('input');

    var output = PUBNUB.$('output'), 
        input = PUBNUB.$('input'), 
        button = PUBNUB.$('button'),
        avatar = PUBNUB.$('avatar')

    var channel = 'mchat';


    var p = PUBNUB.init({
        subscribe_key: 'sub-c-1d799376-85b5-11eb-a47e-8aa5932e3236',
        publish_key:   'pub-c-c3564aa2-a04d-4ab0-bed3-93a42c77e870'
        });


        p.subscribe({
            channel  : channel,
            callback : function(m) {
                if(m.href !== undefined){
                    output.innerHTML = '<p><i class="' + m.avatar + '"></i><a ' + 'href=\"' + m.href + '\"' +  ' target="_blank">' +  m.text.replace( /[<>]/ig, '' ) + '</a></p>' + output.innerHTML; 
                }
            }
        });

    function publishImage() {
        if(textInput.value.length > 0){
            p.publish({
                channel : channel, 
                message : {avatar: avatar.className, text: String(linkValue), href: String(linkValue)}, 
                x : (input.value='')
                });
            };
        }


    var callbackLink = function (res) {
        if (res.success === true) {
            textInput.value = res.data.link;
            linkValue = res.data.link;
            publishImage();
        }
    };
    
    new Imgur({
        clientid: '7f0647e1e9365c2',
        callback: callbackLink
    });
};
