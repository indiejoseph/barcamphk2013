var timeout, windowHeight, descTop, descHeight, whereTop, whereHeight;

$(document).ready(function() {

	// The floating menu only show on desktop browsers
	if(!$(".touch").length) {
		$(window).scroll(scrollHandle);
		scrollHandle();
		$('#follow').tooltip({selector: "a"});
	}

	// Navbar scroll
	$(".navbar").localScroll();
	$(".nav a").click(function() {
		$(".collapse").collapse("toggle");
	});

	// Resize handle
	$(window).resize(function() {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			resizeHandle();
		}, 50);
	});

	resizeHandle();

	//announcement
	try { localStorage.clear(); } catch(e) { console.log(e); }

	getFeed(function(result) {
		var modal = $("#announce-modal");
		var list = $(".list", modal);

		for(var i = 0; i < result.length; i++) {
			if(result[i][0] == " ") {
				continue;
			}
			var parser = new BBCodeParser();
			var body = parser.format(result[i]);

			if(i == 0) {
				$("#announcement .content").html(body.substr(body.indexOf("<b>"), body.indexOf("</b>"))).delay(800).show("slow");
			}

			body = (body.length)?body.replace(/\r\n|\r|\n/g, "<br/>"): "";
			list.append("<li>" + body + "</li>");
		}
	});
});

function scrollHandle() {
	var scrollTop = $(window).scrollTop();
	if(scrollTop > 100) {
		$("#cover-desc em").fadeOut("slow");
	} else {
		$("#cover-desc em").fadeIn("slow");
	}
	if(scrollTop < windowHeight) {
		$("#cover-txt").css("background-position", "50% -" + Math.round(scrollTop / 1.3) + "px");
		//.css("transform", "scale(" + ((100 - (scrollTop/12)) * 0.01) + ")").css("opacity", (100 - (scrollTop/4)) * 0.01);
		$("#cover-bk1").css("background-position", "50% -" + Math.round(scrollTop / 2) + "px");
		$("#cover-bk2").css("background-position", "50% -" + Math.round(scrollTop / 5) + "px");
		$("#cover").css("background-position", "50% -" + Math.round(scrollTop / 12) + "px");
	}
	if(scrollTop > (descTop - descHeight) && scrollTop < (descTop + descHeight)) {
		var offset = ((scrollTop - (descTop - descHeight)) / 6);
		if(offset > 0) {
			offset = (0 - offset) + 100;
			$("#desc").css("background-position", "50% " + offset + "px");
		}
	}
	if(scrollTop > (whereTop - whereHeight) && scrollTop < (whereTop + whereHeight)) {
		var offset = ((scrollTop - (whereTop - whereHeight)) / 6);
		if(offset > 0) {
			offset = (0 - offset) + 100;
			$("#wheres").css("background-position", "50% " + offset + "px");
		}
	}
}

function resizeHandle() {
	var $window = $(window);
	windowHeight = $window.height();
	$("#cover").height(windowHeight);
	$("nav").data("offsetTop", windowHeight);
	$("#wheres").css("min-height", windowHeight + "px");
	$("#desc").css("min-height", windowHeight + "px");
	resetDesc();
	resetWhere();
	$("body").scrollspy('refresh');
}

function resetDesc() {
	var $desc = $("#desc");
	descTop = $desc.offset().top;
	descHeight = $desc.height();
}

function resetWhere() {
	var $where = $("#wheres");
	whereTop = $where.offset().top;
	whereHeight = $where.height();
}

function showFaqs(elm) {
	var $faqs = $("#faqs");
	if($faqs.is(":visible")) {
		$faqs.hide("slow", function(){
			resetWhere();
		});
		$(elm).removeClass("active");
	} else {
		$faqs.show("slow", function() {
			resetWhere();
		});
		$(elm).addClass("active");
	}
}

function getFeed(callback) {
	var lang = getLang();
	var gid = (lang == "zh-hk")?"od6":"od7";
	var feed_url = "https://spreadsheets.google.com/pub?key=0Ar2uZbSZzSlqdF9GVjlPdEx2UUpBX3VQYUxXZE5feXc&hl=en&output=html&gid=" + gid;
	var googleSpreadsheet = new GoogleSpreadsheet();
		googleSpreadsheet.url(feed_url);
		googleSpreadsheet.load(function(result) {
			callback(result.data);
	});
}

function getLang() {
	return $("html").attr("lang");
}