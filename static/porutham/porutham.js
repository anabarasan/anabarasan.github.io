angular.module('10porutham', [])
.controller('matchmaker', function($scope, $log){
    var match = new astro();
                    
    $scope.signs = match.getSigns();
                    
    $scope.stars = match.getStars();
    
    $scope.girlsign = "Select";
    $scope.girlstar = "Select";
    $scope.boysign  = "Select";
    $scope.boystar  = "Select";
    
    $scope.resetstar = function(who) {
        $scope[who] = "Select"
    }
    
    $scope.checkmatch = function() {
        if ($scope.girlsign == "Select" ||
                $scope.girlstar == "Select" || 
                    $scope.boysign == "Select" || 
                        $scope.boystar == "Select") {
            alert("Please Enter all Details");
        } else {

            var girlstardetails = $scope.girlstar.split("-");
            var girlstarpos = parseInt(girlstardetails[0]);
            var girlyonidetails = $scope.stars[girlstarpos].yoni.split(" ");
            var girlyonigender = girlyonidetails[0];
            var girlyonianimal = girlyonidetails[1];
            var boystardetails = $scope.boystar.split("-");
            var boystarpos = parseInt(boystardetails[0]);
            var boyyonidetails = $scope.stars[boystarpos].yoni.split(" ");
            var boyyonigender = boyyonidetails[0];
            var boyyonianimal = boyyonidetails[1];
            
            var boy = {
                rasi : $scope.boysign,
                pos : boystarpos,
                star  : boystardetails[1],
                ganam : $scope.stars[boystarpos - 1].ganam,
                rajju : $scope.stars[boystarpos - 1].rajju,
                yoni : {
                    gender : girlyonigender,
                    animal : girlyonianimal
                }
            }
            
            var girl = {
                rasi : $scope.girlsign,
                pos : girlstarpos,
                star  : girlstardetails[1],
                ganam : $scope.stars[girlstarpos - 1].ganam,
                rajju : $scope.stars[girlstarpos - 1].rajju,
                yoni : {
                    gender : boyyonigender,
                    animal : boyyonianimal
                }
            }
            
            
            match.boy = boy;
            match.girl = girl;
            $scope.result = match.match();
        }
    }
})
.filter("starfilter" , function() {
    return function(input, sign){
        if (typeof sign == 'undefined' || sign == null) {
            return [];
        } else {
            var out = [], 
                i = 0;
            for (i; i < input.length; i++) {
                if (input[i].sign.indexOf(sign) > -1) {
                    out.push(input[i]);
                }
            }
            return out;
        }
    }
})

function astro() {
    var boy, girl, stardiff;
    
    var signs = ["Mesham", "Rishabam", "Midhunam", "Kadagam", "Simham", 
                    "Kanni", "Thulam", "Viruchigam", "Dhanusu", "Magaram",
                    "Kumbam", "Meenam"];
                    
    var rasi = {
        "Mesham"     : {"pos" : 1, "lord" : "Mars", "attraction" : {"girl" : ["Simham", "Viruchigam"]}},
        "Rishabam"   : {"pos" : 2, "lord" : "Venus", "attraction" : {"girl" : ["Kadagam", "Thulam"]}},
        "Midhunam"   : {"pos" : 3, "lord" : "Mercury", "attraction" : {"girl" : ["Kanni"]}},
        "Kadagam"    : {"pos" : 4, "lord" : "Moon", "attraction" : {"girl" : ["Viruchigam", "Dhanusu"]}},
        "Simham"     : {"pos" : 5, "lord" : "Sun", "attraction" : {"girl" : ["Thulam"]}},
        "Kanni"      : {"pos" : 6, "lord" : "Mercury", "attraction" : {"girl" : ["Midhunam", "Meenam"]}},
        "Thulam"     : {"pos" : 7, "lord" : "Venus", "attraction" : {"girl" : ["Kanni", "Magaram"]}},
        "Viruchigam" : {"pos" : 8, "lord" : "Mars", "attraction" : {"girl" : ["Kadagam"]}},
        "Dhanusu"    : {"pos" : 9, "lord" : "Jupiter", "attraction" : {"girl" : ["Meenam"]}},
        "Magaram"    : {"pos" : 10, "lord" : "Saturn", "attraction" : {"girl" : ["Mesham", "Kumbam"]}},
        "Kumbam"     : {"pos" : 11, "lord" : "Saturn", "attraction" : {"girl" : ["Mesham"]}},
        "Meenam"     : {"pos" : 12, "lord" : "Jupiter", "attraction" : {"girl" : ["Magaram"]}}
    };
    
    var stars = {
        "list" : [
            {"pos" : 1, "name" : "Aswini", "sign" : ["Mesham"], "ganam" : "Deva", 
                "rajju" : "Paadam", "lord" : "Keethu", "repellant" : ["Ketai"],
					"yoni": "Male Horse"},
            {"pos" : 2, "name" : "Bharani", "sign" : ["Mesham"], "ganam" : "Manusha", 
                "rajju" : "Kati", "lord" : "Venus", "repellant" : ["Anusham"],
					"yoni": "Male Elephant"},
            {"pos" : 3, "name" : "Karthigai", "sign" : ["Mesham", "Rishabam"], "ganam" : "Raakshasa",
                "rajju" : "Nabhi", "lord" : "Sun", "repellant" : ["Visagam"],
					"yoni": "Female Goat"},
            {"pos" : 4, "name" : "Rohini", "sign" : ["Rishabam"], "ganam" : "Manusha",
                "rajju" : "Kanta", "lord" : "Moon", "repellant" : ["Swathi"],
					"yoni": "Male Snake"},
            {"pos" : 5, "name" : "Mrigashirsham", "sign" : ["Rishabam", "Midhunam"], "ganam" : "Deva", 
                "rajju" : "Sirasu", "lord" : "Mars", "repellant" : ["Chitrai", "Avittam"],
					"yoni": "Female Elephant"},
            {"pos" : 6, "name" : "Thiruvadirai", "sign" : ["Midhunam"], "ganam" : "Manusha",
                "rajju" : "Kanta", "lord" : "Raahu", "repellant" : ["Thiruvonam"],
					"yoni": "Male Dog"},
            {"pos" : 7, "name" : "Punarpoosam", "sign" : ["Midhunam", "Kadagam"], "ganam" : "Deva",
				"rajju" : "Nabhi", "lord" : "Venus", "repellant" : ["Uttaradam"],
					"yoni": "Female Cat"},
            {"pos" : 8, "name" : "Poosam", "sign" : ["Kadagam"], "ganam" : "Deva",
				"rajju" : "Kati", "lord" : "Saturn", "repellant" : ["Pooradam"],
					"yoni": "Male Goat"},
            {"pos" : 9, "name" : "Aayilyam", "sign" : ["Kadagam"], "ganam" : "Raakshasa",
				"rajju" : "Paadam", "lord" : "Mercury", "repellant" : ["Moolam"],
					"yoni": "Male Cat"},
            {"pos" : 10, "name" : "Magham", "sign" : ["Simham"], "ganam" : "Raakshasa",
				"rajju" : "Paadam", "lord" : "Keethu", "repellant" : ["Revathi"],
					"yoni": "Male Rat"},
            {"pos" : 11, "name" : "Pooram", "sign" : ["Simham"], "ganam" : "Manusha",
				"rajju" : "Kati", "lord" : "Venus", "repellant" : ["Utrattadhi"],
					"yoni": "Female Tiger"},
            {"pos" : 12, "name" : "Uttram", "sign" : ["Simham", "Kanni"], "ganam" : "Manusha",
				"rajju" : "Nabhi", "lord" : "Sun", "repellant" : ["Poorattadhi"],
					"yoni": "Male Cow"},
            {"pos" : 13, "name" : "Hastam", "sign" : ["Kanni"], "ganam" : "Deva",
				"rajju" : "Kanta", "lord" : "Moon", "repellant" : ["Sadayam"],
					"yoni": "Female Buffalo"},
            {"pos" : 14, "name" : "Chitrai", "sign" : ["Kanni", "Thulam"], "ganam" : "Raakshasa",
				"rajju" : "Sirasu", "lord" : "Mars", "repellant" : ["Mrigashirsham"],
					"yoni": "Male Tiger"},
            {"pos" : 15, "name" : "Swathi", "sign" : ["Thulam"], "ganam" : "Deva",
				"rajju" : "Kanta", "lord" : "Raahu", "repellant" : ["Rohini"],
					"yoni": "Male Buffalo"},
            {"pos" : 16, "name" : "Visagam", "sign" : ["Thulam", "Viruchigam"], "ganam" : "Raakshasa",
				"rajju" : "Nabhi", "lord" : "Jupiter", "repellant" : ["Karthigai"],
					"yoni": "Female Tiger"},
            {"pos" : 17, "name" : "Anusham", "sign" : ["Viruchigam"], "ganam" : "Deva",
				"rajju" : "Kati", "lord" : "Saturn", "repellant" : ["Bharani"],
					"yoni": "Female Deer"},
            {"pos" : 18, "name" : "Ketai", "sign" : ["Viruchigam"], "ganam" : "Raakshasa",
				"rajju" : "Paadam", "lord" : "Mercury", "repellant" : ["Aswini"],
					"yoni": "Male Deer"},
            {"pos" : 19, "name" : "Moolam", "sign" : ["Dhanusu"], "ganam" : "Raakshasa",
				"rajju" : "Paadam", "lord" : "Keethu", "repellant" : ["Aayilyam"],
					"yoni": "Female Dog"},
            {"pos" : 20, "name" : "Pooradam", "sign" : ["Dhanusu"], "ganam" : "Manusha",
				"rajju" : "Kati", "lord" : "Venus", "repellant" : ["Poosam"],
					"yoni": "Male Monkey"},
            {"pos" : 21, "name" : "Uttaradam", "sign" : ["Dhanusu", "Magaram"], "ganam" : "Manusha",
				"rajju" : "Nabhi", "lord" : "Sun", "repellant" : ["Punarpoosam"],
					"yoni": "Female Cow"},
            {"pos" : 22, "name" : "Thiruvonam", "sign" : ["Magaram"], "ganam" : "Deva",
				"rajju" : "Kanta", "lord" : "Moon", "repellant" : ["Thiruvadirai"],
					"yoni": "Female Monkey"},
            {"pos" : 23, "name" : "Avittam", "sign" : ["Magaram", "Kumbam"], "ganam" : "Raakshasa",
				"rajju" : "Sirasu", "lord" : "Mars", "repellant" : ["Mrigashirsham"],
					"yoni": "Female Lion"},
            {"pos" : 24, "name" : "Sadayam", "sign" : ["Kumbam"], "ganam" : "Raakshasa",
				"rajju" : "Kanta", "lord" : "Raahu", "repellant" : ["Hastam"],
					"yoni": "Female Monkey"},
            {"pos" : 25, "name" : "Poorattadhi", "sign" : ["Kumbam", "Meenam"], "ganam" : "Manusha",
				"rajju" : "Nabhi", "lord" : "Jupiter", "repellant" : ["Uttram"],
					"yoni": "Male Lion"},
            {"pos" : 26, "name" : "Utrattadhi", "sign" : ["Meenam"], "ganam" : "Manusha", 
                "rajju" : "Kati", "lord" : "Saturn", "repellant" : ["Pooram"],
					"yoni": "Female Cow"},
            {"pos" : 27, "name" : "Revathi", "sign" : ["Meenam"], "ganam" : "Deva", 
                "rajju" : "Paadam", "lord" : "Mercury", "repellant" : ["Magham"],
					"yoni": "Female Elephant"}
        ],
        "matching_stars" : {
            "uttamam" : ["Rohini", "Thiruvadirai", "Magham", "Hastam", "Visakham",
                "Thiruvonam", "Utthirattadhi", "Revati"],
            "madhyamam"   : ["Ashvini", "Karthigai", "Mrigashirsham", "Punarpoosam",
                "Poosam", "Pooram", "Uttaram", "Chitrai", "Svati", "Anusham",
                "Pooradam", "Uttaradam"],
            "adhamam"  : ["Bharani", "Aayilyam", "Ketai", "Moolam", "Avittam", 
                "Sadayam", "Poorattadhi"]
        },
        "diff" : {
            "uttamam" : [2, 4, 6, 8, 9, 11, 13, 15, 17, 18, 20, 22, 24, 26],
            "madhyamam" : [3, 5, 7, 12, 14, 16, 21, 23, 25],
            "adhamam"  : [10, 19]
        }
    };
    
    var planets = {
        "Sun" : {
            "Friend" : ["Moon", "Mars", "Jupiter"],
            "Enemy" : ["Saturn", "Venus", "Raahu", "Keethu"],
            "Neutral" : ["Mercury"]
        },
        "Moon" : {
            "Friend" : ["Sun", "Mercury"],
            "Enemy" : ["Raahu", "Keethu"],
            "Neutral" : ["Mars", "Jupiter", "Venus", "Saturn"]
        },
        "Mars" : {
            "Friend" : ["Sun", "Moon", "Jupiter"],
            "Enemy" : ["Mercury", "Raahu", "Keethu"],
            "Neutral" : ["Venus", "Saturn"]
        },
        "Mercury" : {
            "Friend" : ["Sun", "Venus"],
            "Enemy" : ["Moon"],
            "Neutral" : ["Mars", "Jupiter", "Saturn", "Raahu", "Keethu"]
        },
        "Jupiter" : {
            "Friend" : ["Sun", "Moon", "Mars"],
            "Enemy" : ["Mercury", "Venus"],
            "Neutral" : ["Saturn", "Raahu", "Keethu"]
        },
        "Venus" : {
            "Friend" : ["Mercury", "Saturn", "Raahu", "Keethu"],
            "Enemy" : ["Sun", "Moon"],
            "Neutral" : ["Mars", "Jupiter"]
        },
        "Saturn" : {
            "Friend" : ["Venus", "Mercury", "Raahu", "Keethu"],
            "Enemy" : ["Sun", "Moon", "Mars"],
            "Neutral" : ["Jupiter"]
        }
    };
    
    var yonienemies = {
        "Horse" : ["Cow", "Tiger", "Buffalo", "Lion"],
        "Elephant" : ["Tiger", "Lion"],
        "Snake" : ["Rat"],
        "Dog" : ["Cat", "Deer"],
        "Goat" : ["Tiger", "Monkey", "Lion"],
        "Cat" : ["Rat", "Dog"],
        "Rat" : ["Snake", "Cat"],
        "Cow" : ["Tiger", "Horse", "Lion"],
        "Tiger" : ["Horse", "Elephant", "Goat", "Cow", "Deer", "Buffalo"],
        "Buffalo" : ["Tiger", "Horse", "Lion"],
        "Deer" : ["Dog", "Tiger", "Lion"],
        "Monkey" : ["Goat"],
        "Lion" : ["Horse", "Elephant", "Goat", "Cow", "Deer", "Buffalo"]
    };
    
    var dinam = function () {
        var diff;
        
        if (boy.pos > girl.pos) {
            diff = boy.pos - girl.pos +1;
        } else if (boy.pos < girl.pos) {
            diff = (27 - girl.pos + 1) + boy.pos;
        } else if (boy.pos == girl.pos) {
            if (stars.matching_stars.uttamam.indexOf(girl.star) > -1) {
                return "uttamam";
            } else if (stars.matching_stars.madhyamam.indexOf(girl.star) > -1)  {
                return "madhyamam";
            } else if (stars.matching_stars.adhamam.indexOf(girl.star) > -1) {
                return "adhamam";
            }
        }
        
        stardiff = diff;
        
        if (diff == 27) {
            if (boy.rasi == girl.rasi) {
                return "uttamam"
            } else {
                return "adhamam"
            }
        } else if (stars.diff.uttamam.indexOf(diff) > -1) {
            return "uttamam";
        } else if (stars.diff.madhyamam.indexOf(diff) > -1)  {
            return "madhyamam";
        } else if (stars.diff.adhamam.indexOf(diff) > -1) {
            return "adhamam";
        }
    };
    
    var ganam = function () {
        if (girl.ganam == boy.ganam && girl.ganam != "Raakshasa") {
            return "uttamam";
        } else if (((girl.ganam == "Deva" && boy.ganam == "Manusha") || 
                    (girl.ganam == "Manusha" && boy.ganam == "Deva")) || 
                (girl.ganam != "Raakshasa" && boy.ganam == "Raakshasa")) {
            return "madhyamam";
        } else if (girl.ganam == "Raakshasa") {
            return "adhamam";
        }
    };
    
    var mahendram = function () {
        if ([4, 7, 10, 13, 16, 19, 22, 25].indexOf(stardiff) > -1) {
            return "uttamam";
        } else {
            return "adhamam";
        }
    };
    
    var strideergam = function () {
        if (stardiff > 13) {
            return "uttamam";
        } else if (stardiff > 7) {
            return "madhyamam";
        } else {
            return "adhamam";
        }
    };
    
    var yoni = function() {
        if (yonienemies[girl.yoni.animal].indexOf(boy.yoni.animal) == -1) {
            if (boy.yoni.gender == "Male" && girl.yoni.gender == "Female") {
                return "uttamam";
            } else if (boy.yoni.gender == "Female" && girl.yoni.gender == "Male") {
                return "madhyamam";
            } else {
                return "adhamam";
            }
        } else {
            return "adhamam"
        }
    };
    
    var raasi = function () {
        var girlrasi = rasi[girl.rasi].pos;
        var boyrasi = rasi[boy.rasi].pos;
        var rasidiff;
        
        if (girlrasi > boyrasi) {
            rasidiff = 12 - girlrasi + boyrasi + 1;
        } else if (boyrasi > girlrasi) {
            rasidiff = boyrasi - girlrasi + 1;
        } else if (girlrasi == boyrasi) {
            rasidiff = 1;
        }
        if (rasidiff < 7 || rasidiff == 8) {
            return "adhamam";
        } else {
            return "uttamam";
        }
    };

    var raasiadhibadhi = function () {
        var girllord = rasi[girl.rasi].lord;
        var boylord = rasi[boy.rasi].lord;
        
        var girllorddetails = planets[girllord];
        
        if (girllorddetails.Friend.indexOf(boylord) > -1) { 
            return "uttamam";
        } else if (girllord == boylord || girllorddetails.Enemy.indexOf(boylord) > -1) {
            return "madhyamam";
        } else if (girllorddetails.Neutral.indexOf(boylord) > -1) {
            return "adhamam";
        }
    };
    
    var vasiyam = function () {
        if (rasi[girl.rasi].attraction.girl.indexOf(boy.rasi) > -1) {
            return "uttamam";
        } else {
            return "adhamam";
        }
    };

    var rajju = function () {
        if (girl.rajju == boy.rajju) {
            return "adhamam";
        } else {
            return "uttamam";
        }
    };

    var vedam = function () {
        if (girl.repellant != boy.star) {
            return "uttamam";
        } else {
            return "adhamam";
        }
    };

    this.boy;
    this.girl;
    
    this.getSigns = function() {
        return signs;
    };
    
    this.getStars = function() {
        return stars.list;
    };
    
    this.match = function () {
        boy = this.boy;
        girl = this.girl;
        return {
            "dinam" : dinam(),
            "ganam" : ganam(),
            "mahendram" : mahendram(),
            "strideergam" : strideergam(),
            "yoni" : yoni(),
            "raasi" : raasi(),
            "raasiadhibadhi" : raasiadhibadhi(),
            "vasiyam" : vasiyam(),
            "rajju" : rajju(),
            "vedam" : vedam()
        }
    };
}