$(document).ready(function(){
      // Starting sample size notes
      $("a.toggleStartingSampleNotes").click(function(){
       $(".startingSampleNotes").toggle();
       if ($("a.toggleStartingSampleNotes").text() == 'Show technical notes.') {
         $("a.toggleStartingSampleNotes").text('Hide technical notes.');
       } else {
         $("a.toggleStartingSampleNotes").text('Show technical notes.');
       }
       return(false);
     }
     );
      // Ending sample size notes
      $("a.toggleEndingSampleNotes").click(function(){
       $(".endingSampleNotes").toggle();
       if ($("a.toggleEndingSampleNotes").text() == 'Show technical notes.') {
         $("a.toggleEndingSampleNotes").text('Hide technical notes.');
       } else {
         $("a.toggleEndingSampleNotes").text('Show technical notes.');
       }
       return(false);
     }
     );
      // Random sampling notes
      $("a.toggleRandomSampleNotes").click(function(){
       $(".randomSampleNotes").toggle();
       if ($("a.toggleRandomSampleNotes").text() == 'Show technical notes.') {
         $("a.toggleRandomSampleNotes").text('Hide technical notes.');
       } else {
         $("a.toggleRandomSampleNotes").text('Show technical notes.');
       }
       return(false);
     }
     );
      $(".notes").hide();
      $(".notes").css({color:"#333", 'font-size':"80%", 'margin-left':"5%", 'background-color':'#eee'});
      $("#hideAllProse").click(function(){$("p:not(form p),pre:not(form pre),table:not(form table),ul:not(form ul),li:not(form li),#visualizing,#placeholder,#plotTitle,#considerations" ).toggle();$(".notes").hide();$("#hideAll").show();});

      // set up the first contest
      // addContest();
      // $("#addContestButton").click(function(){addContest();});
      // $("#removeContestButton").click(function(){removeContest();});
      // $("input[type=text]").focus(function(){this.select();});
      // $("#roundUp1").change(function(){sampleSizeEst();findNmin();});
      // $("#roundUp2").change(function(){sampleSizeEst();findNmin();});
      // $("#startSize").click(function(){sampleSizeEst();findNmin();});
      // $("#byMargin").change(function(){plotSample();});

      var current = 2;
      var table = document.createElement('table');
      var arr = [];
      var arrC = [];
      var count = 1;
      var colCount = 1;
      for (var i = 0; i < current + 1; i++) {
        arr[i] = document.createElement('tr');
        for (var j = 0; j < current + 1; j++) {
          arrC[j] = document.createElement('td');
          if (i == 0 && j == 0) {
            var text1 = document.createTextNode("Candidates");
          } else if (i == 0) {
            var text1 = document.createTextNode(colCount - 1);
          } else if (j == 0) {
            var text1 = document.createTextNode(count - 1);
          } else if (i == j) {
            var text1 = document.createTextNode("-");
          } else {
            var text1 = document.createTextNode("0.5");
          }
          arrC[j].appendChild(text1);
          arr[i].appendChild(arrC[j]);
          colCount += 1;
        }
        count += 1;
        table.appendChild(arr[i]);
      }
      $(table).css({"border": "5px 1px solid black"});
      $('.contestTable').append(table);
  //document.body.appendChild(table);

  $('#addContestButton').click(function() {
    //var line = document.createElement('hr');
    //document.body.appendChild(line);
    var table = document.createElement('table');
    var arr = [];
    var arrC = [];
    var count = 1;
    var colCount = 1;
    for (var i = 0; i < current + 1; i++) {
      arr[i] = document.createElement('tr');
      for (var j = 0; j < current + 1; j++) {
        arrC[j] = document.createElement('td');
        if (i == 0 && j == 0) {
          var text1 = document.createTextNode("Candidates");
        } else if (i == 0) {
          var text1 = document.createTextNode(colCount - 1);
        } else if (j == 0) {
          var text1 = document.createTextNode(count - 1);
        } else if (i == j) {
          var text1 = document.createTextNode("-");
        } else {
          var text1 = document.createTextNode("0.5");
        }
        arrC[j].appendChild(text1);
        arr[i].appendChild(arrC[j]);
        colCount += 1;
      }
      count += 1;
      table.appendChild(arr[i]);
    }
    $(table).css({"border": "5px 1px solid black"});
    $('.contestTable').append(table);
  });

$('#removeContestButton').click(function() {
  $('table:last-child').remove();
});

$('#addCandidate').click(function() {
    var added = add(current);
    createTable(added);
  });

$('#removeCandidate').click(function() {
  var added = sub(current);
  createTable(added);
});

var add = function(number) {
  current = current + 1;
  if (current > 10) {
    current = 10;
  }
    return current;
};

  var sub = function(number) {
  current = current - 1;
  if (current < 2) {
    current = 2;
  }
    return current;
};

var createTable = function(number) {
  table.remove();
  table = document.createElement('table');
  var count = 1;
  var colCount = 1;
  for (var i = 0; i < current + 1; i++) {
    arr[i] = document.createElement('tr');
    for (var j = 0; j < current + 1; j++) {
      arrC[j] = document.createElement('td');
      if (i == 0 && j == 0) {
      var text1 = document.createTextNode("Candidates");
      } else if (i == 0) {
        var text1 = document.createTextNode(colCount - 1);
      } else if (j == 0) {
        var text1 = document.createTextNode(count - 1);
      } else if (i == j) {
        var text1 = document.createTextNode("-");
      } else {
        var text1 = document.createTextNode("0.5");
      }
      arrC[j].appendChild(text1);
      arr[i].appendChild(arrC[j]);
      colCount += 1;
    }
    count += 1;
    table.appendChild(arr[i]);
  }
  document.body.appendChild(table);
};


// ------------------------------------
var candidates = [];
var errBallots = [];
var names = [];
var ballots;

		function addContest() {
		    candidates.push([]);
		    names.push([]);
		    var conStr = (candidates.length-1).toString();
		    var str = '<hr align="left" id="hrCon' + conStr + '"><div class="contest" id="contest' + conStr + '" contest="' + conStr + '">' +
		              '<span class="label">Contest ' + candidates.length.toString() +
		              '.&nbsp;&nbsp;</span>' +
		              '<label for="contestName' + conStr + '">Contest name: </label>' +
		              '<input type="text" size="80" id="contestName' + conStr + '" class="contestName" /><br />' +
		              '<label for="voteForContest' + conStr +  '">Winners:&nbsp;</label>' +
		              '<select id="voteForContest' + conStr + '" onchange="updateVotes();">' +
		                 '<option value="1">1</option>' +
		                 '<option value="2">2</option>' +
		                 '<option value="3">3</option>' +
		                 '<option value="4">4</option>' +
		                 '<option value="5">5</option>' +
		                 '<option value="6">6</option>' +
		                 '<option value="7">7</option>' +
		                 '<option value="8">8</option>' +
		                 '<option value="9">9</option>' +
		                 '<option value="10">10</option>' +
		              '</select><p><span class="label">Reported votes:</span></p></div><br />' +
		              '<div class="addCandidate" id="addCandidate' + conStr + '" contest="' + conStr + '">' +
		              '<input type="button" id="addCandidateButton' + conStr +
		              '" value="Add candidate to contest ' + candidates.length.toString() +
		              '" contest="' + conStr + '"/>' +
		              '<input type="button" id="removeCandidateButton' + conStr +
		              '" value="Remove last candidate from contest ' + candidates.length.toString() +
		              '" contest="' + conStr + '"/></div>';
		    $(".contestList").append(str);
		    $("#contest" + (candidates.length-1).toString()).append(addCandidate(candidates.length-1));
            $("#contest" + (candidates.length-1).toString()).append(addCandidate(candidates.length-1));
		    var conRef = "#contest" + conStr;
		    var candRefLast = '.candidate.contest' + candidates.length + ':last';
		    var thisContest = candidates.length-1;
		    $("#contestName" + conStr).blur(function(){names[conStr][0] = this.value;});
		    $("#addCandidateButton" + conStr).click(function(){$(conRef).append(addCandidate(conStr));updateVotes();});
		    $("#removeCandidateButton" + conStr).click(function(){$(candRefLast).remove();
		                                                          candidates[thisContest].pop();
		                                                          names[thisContest].pop();
		                                                          updateVotes();}
		                                              );
		    return(true);
		}

		function removeContest() {
		    var conStr = (candidates.length-1).toString();
		    $("#hrCon" + conStr).remove();
		    $("#contest" + conStr).remove();
		    $("#addCandidateButton" + conStr).remove();
		    $("#removeCandidateButton" + conStr).remove();
		    candidates.pop();
		    names.pop();
		    return(true);
		}


		function addCandidate(contest) {
            candidates[contest].push(0);
		    var theCandidate = (parseInt(contest)+1).toString() + '_' + candidates[contest].length.toString();
		    return('<div class="candidate contest' + (parseInt(contest)+1).toString() + '" ' +
		           'id="candidate_' +  theCandidate + '">' +
		           '<label for="name' + theCandidate + '">Candidate ' + candidates[contest].length +  ' Name: </label> ' +
		           '<input type="text" size="40" id="name' + theCandidate + '" onblur="names[' + contest + '][' +
		              (candidates[contest].length-1) + ']=this.value;" />' +
		           '<label for="nBallots' + theCandidate + '">&nbsp;&nbsp;Votes: ' + '</label>' +
		           '<input type="text" size="10" id="nBallots' + theCandidate + '" onblur="updateVotes()"/></div>');
		}


		var hasher;
		var sample = new Array(3);
		sample[0] = new Array();
		sample[1] = new Array();
		sample[2] = new Array();

		function hashMe() {
			hasher = new jsSHA($("#seedValue").val() + "," +
			                   $("#samNum").val(), "ASCII");
			$("#nObj").val(parseInt($("#nObj").val()));
			if ($("#nObj").val() == 'NaN') {
			    $("#nObj").val(1);
			}
			try {
			    sample[0].push($("#samNum").val());
				sample[1].push(hasher.getHash("SHA-256", "HEX"));
				sample[2].push(1 +
			                     modInt( str2bigInt(hasher.getHash("SHA-256", "HEX"), 16, 0),
			                              parseInt($("#nObj").val())
			                           )
			                   );
                writeList();
                $("#sortedList").val(sample[2].slice().sort(numberLessThan).join(','));
                $("#ballotList").val($("#sortedList").val());
                var deDupeList = sortMultiple(sample[2], numberLessThan);
                $("#sortedDedupeList").val(deDupeList[0].join(','));
                if (vMinMax(deDupeList[1])[1] > 1) {
                     $("#duplicates").val('Ballot, multiplicity\n' + arrayToString(findRepeats(deDupeList)));
                }
            } catch(e) {
			}
		}

        function writeList() {
            if ($("#showSequence").prop('checked') &
                   $("#showHash").prop('checked') ) {
                $("#list").val('sequence_number, hash value, ballot\n' + arrayToString(sample));
            } else if ($("#showSequence").prop('checked')) {
                $("#list").val('sequence_number, ballot\n' + arrayToString([sample[0],sample[2]]));
            } else if ($("#showHash").prop('checked')) {
                $("#list").val('hash, ballot\n' + arrayToString([sample[1],sample[2]]));
            } else {
                $("#list").val(sample[2].join(','));
            }
            return(true);
        }



		function startMe() {
		    clearList();
		    hashMe();
		}

		function clearList() {
		    sample = new Array(3);
		    sample[0] = new Array();
		    sample[1] = new Array();
		    sample[2] = new Array();
		    $("#list").val('');
		    $("#sortedList").val('');
		    $("#sortedDedupeList").val('');
		    $("#ballotList").val('');
		    $("#duplicates").val('');
		}

		function resetMe() {
		    clearList();
		    $("#samNum").val('0');
        }

		function nextSample() {
		    for (var i=0; i < parseInt($("#samMany").val()); i++) {
		        $("#samNum").val(parseInt($("#samNum").val()) + 1);
		        hashMe();
		        $("#sizeSoFar").text('Ballots audited so far: ' + sample[0].length.toString());
		    }
		}

    gamma = 1.03905;
    alpha = 0.1;


    function nmin(alpha, gamma, m, o1, o2, u1, u2) {
        return(Math.max(
                    o1+o2+u1+u1,
                    Math.ceil(-2*gamma*( Math.log(alpha) +
                                         o1*Math.log(1-1/(2*gamma)) +
                                         o2*Math.log(1 - 1/gamma) +
                                         u1*Math.log(1+1/(2*gamma)) +
                                         u2*Math.log(1+1/gamma)) / m
                             )
                        )
                );
    }


    function nminFromRates(alpha, gamma, m, r1, r2, s1, s2, roundUp1, roundUp2) {
        var n0 = -2*gamma*Math.log(alpha) /
                      (m + 2*gamma*(r1*Math.log(1-1/(2*gamma)) +
                       r2*Math.log(1 - 1/gamma) + s1*Math.log(1+1/(2*gamma)) + s2*Math.log(1+1/gamma))
                      );
        var o1, o2, u1, u2;
        for (var i=0; i < 3; i++) {
            if (roundUp1) {
                 o1 = Math.ceil(r1*n0);
                 u1 = Math.ceil(s1*n0);
            } else {
                 o1 = Math.round(r1*n0);
                 u1 = Math.round(s1*n0);

            }
            if (roundUp2) {
                 o2 = Math.ceil(r2*n0);
                 u2 = Math.ceil(s2*n0);
            } else {
                 o2 = Math.round(r2*n0);
                 u2 = Math.round(s2*n0);
            }
            n0 = nmin(alpha, gamma, m, o1, o2, u1, u2);
        }
        return(n0);
    }


    var minMargin;

    function findMinMargin() {
        ballots = parseInt($("#nBallots").val());
        if (candidates.length > 0) {
               minMargin = ballots;
        } else {
            minMargin = Number.NaN;
        }
        var ballOk = !isNaN(ballots);
        var opsOk = true;
        var votesOk = true;
        try {
            for (var i=0; i < candidates.length; i++) {
               var cani = parseInt($("#voteForContest" + i.toString()).val());
               if (candidates[i].length < cani ) {
                   opsOk = false;
               }
               for (var j=0; j < candidates[i].length; j++) {
                   candidates[i][j] = parseInt($("#nBallots" + (i+1).toString() + '_' + (j+1).toString()).val());
               }
               if (vSum(candidates[i]) > cani*ballots) {
                   votesOk = false;
               }
               var dum = candidates[i].slice().sort(numberLessThan).reverse();
               minMargin = Math.min(minMargin, dum[cani-1] - dum[cani]);
               for (var j=0; j < candidates[i].length; j++) {
                   var theCandidate = (i+1).toString() + '_' + (j+1).toString();
                   if (candidates[i][j] > dum[cani]) {
                        $("#candidate_" + theCandidate).css('backgroundColor', '#5e5');
                   } else {
                        $("#candidate_" + theCandidate).css('backgroundColor', '');
                   }
               }
            }
        } catch(e) {
           minMargin = 'undefined';
           alert(e);
        }
        if (!opsOk | isNaN(minMargin)) {
            minMargin = 'undefined';
            $("#theDilutedMargin").text('Diluted margin: undefined.');
            $("#theMargin").text('Smallest margin (votes): undefined. ');
        } else {
            $("#theMargin").text('Smallest margin (votes): ' + commify(minMargin) + '. ');
            $("#theDilutedMargin").text(' Diluted margin: ' + commify(doubleToStr(100*minMargin/ballots,2)) + '%. ');
        }
        return(opsOk & votesOk & ballOk);
    }

    function updateVotes() {
        clearSampleSizes();
        findMinMargin();
        return(true);
    }

    function clearSampleSizes() {
        $('#startSampleSize').html('&hellip;');
        $('#stopSampleSize').html('&hellip;');
        $('#auditComplete').html('&nbsp;Audit incomplete&nbsp;');
        $('#auditComplete').css('backgroundColor','#E55');
        return(true);
    }

    function sampleSizeEst() {
        var n = Number.NaN;
        if (!findMinMargin()) {
           try {
               for (var i=0; i < candidates.length; i++) {
                   var vf = parseInt($("#voteForContest" + i.toString()).val());
                   if (candidates[i].length <  vf ) {
                       throw 'Fewer candidates than voting opportunities in contest ' + (i+1).toString() + '!';
                   }
                   if (vSum(candidates[i]) > vf*ballots) {
                       throw 'More votes than voting opportunities in contest ' + (i+1).toString() + '!';
                   }
                   if (isNaN(parseInt($("#nBallots").val()))) {
                       throw 'Total number of ballots must be specified!';
                   }
               }
           } catch(e) {
               $("#startSampleSize").html('&hellip;');
               alert(e);
           }
        } else if (parseInt(minMargin) > 0) {
            try {
              var m = minMargin/parseInt($("#nBallots").val());
              var risk = parsePercent($("#risk").val());
              var r1 = $("#rateOneOver").val();
              var r2 = $("#rateTwoOver").val();
              var s1 = $("#rateOneUnder").val();
              var s2 = $("#rateTwoUnder").val();
              n = nminFromRates(risk, gamma, m, r1, r2, s1, s2,
                    $("#roundUp1").prop('checked'), $("#roundUp2").prop('checked'));
              $("#startSampleSize").text(' ' + n.toString() + '.');
              $("#samMany").val(n.toString());
            } catch(e) {
               alert(e);
            }
        } else {
              $("#startSampleSize").html('&hellip;');
              $("#samMany").val(0);
        }
    }

    function findNmin() {
        var n = Number.NaN;
        var nf = Number.NaN;
        if (!findMinMargin()) {
           try {
               for (var i=0; i < candidates.length; i++) {
                   var vf = parseInt($("#voteForContest" + i.toString()).val());
                   if (candidates[i].length <  vf ) {
                       throw 'Fewer candidates than voting opportunities in contest ' + (i+1).toString() + '!';
                   }
                   if (vSum(candidates[i]) > vf*ballots) {
                       throw 'More votes than voting opportunities in contest ' + (i+1).toString() + '!';
                   }
               }
           } catch(e) {
               clearStops();
               alert(e);
           }
        } else if (parseInt(minMargin) > 0) {
            try {
              var m = minMargin/parseInt($("#nBallots").val());
              var risk = parsePercent($("#risk").val());
              var o1 = parseInt($("#oneOver").val());
              var o2 = parseInt($("#twoOver").val());
              var u1 = parseInt($("#oneUnder").val());
              var u2 = parseInt($("#twoUnder").val());
              var samSize = $('#samNum').val();
              if (samSize > 0) {
                  var r1 = o1/samSize;
                  var r2 = o2/samSize;
                  var s1 = u1/samSize;
                  var s2 = u2/samSize;
                  $('#obsRateOneOver').html('Rate: ' + doubleToStr(r1,4));
                  $('#obsRateTwoOver').html('Rate: ' + doubleToStr(r2,4));
                  $('#obsRateOneUnder').html('Rate: ' + doubleToStr(s1,4));
                  $('#obsRateTwoUnder').html('Rate: ' + doubleToStr(s2,4));
                  n = nmin(risk, gamma, m, o1, o2, u1, u2);
                  nf = nminFromRates(risk, gamma, m, r1, r2, s1, s2, $("#roundUp1").prop('checked'), $("#roundUp2").prop('checked'));
                  $("#stopSampleSize").text(' If no more differences are observed: ' + n.toString() + '. ');
                  $("#estStopSampleSize").html(' If differences continue at the same rates: ' + nf.toString() + '. ');
                  $("#additionalBallots").html(' Estimated additional ballots if difference rates stay the same: ' + Math.max(0, nf - n).toString() + '.');
                  if (samSize >= n) {
                       $('#auditComplete').html('&nbsp;Audit complete&nbsp;');
                       $('#auditComplete').css('backgroundColor','#5E5');
                  }
               } else {
                  $('#obsRateOneOver').html('Rate: &hellip; ');
                  $('#obsRateTwoOver').html('Rate: &hellip; ');
                  $('#obsRateOneUnder').html('Rate: &hellip; ');
                  $('#obsRateTwoUnder').html('Rate: &hellip; ');
                  n = nmin(risk, gamma, m, o1, o2, u1, u2);
                  $("#stopSampleSize").text(' If no more differences are observed: ' + n.toString() + '. ');
                  $("#estStopSampleSize").html(' If differences continue at the same rates: &hellip; . ');
                  $("#additionalBallots").html(' Estimated additional ballots if difference rates stay the same: &hellip; .');
                  $('#auditComplete').html('&nbsp;Audit incomplete&nbsp;');
                 $('#auditComplete').css('backgroundColor','#E55');
               }
            } catch(e) {
               alert(e);
            }
        } else {
              clearStops();
        }
    }

    function clearStops() {
         $("#stopSampleSize").html(' If no more differences are observed: &hellip;');
         $("#estStopSampleSize").html(' If differences continue at the same rates: &hellip; . ');
         $("#additionalBallots").html('Estimated additional ballots if difference rates stay the same: &hellip; ');
         $('#auditComplete').html('&nbsp;Audit incomplete&nbsp;');
         $('#auditComplete').css('backgroundColor','#E55');
    }


    function lookUpBallots(whichBallots, sort) {
        for (var i=0; i < whichBallots.length; i++) {
           whichBallots[i] = parseInt(whichBallots[i]);  // the ballots to find
        }
        if (parseManifest()) {
           if (vSum(manifest[1]) != $("#nObj").val()) {
                alert('Error: Number of ballots in the manifest, ' + vSum(manifest[1]).toString() +
                      ' is not equal to the number of ballots in the contest, ' + $("#nObj").val() +'!');
                return(Number.NaN);
            } else if (vMinMax(whichBallots)[1] > vSum(manifest[1])) {
                alert('Error: Requested ballot exceeds the number of ballots in the manifest!');
                return(Number.NaN);
            } else if (vMinMax(whichBallots)[0] < 1) {
                alert('Error: Requested ballot number is negative!');
                return(Number.NaN);
            }
            var manCum = new Array(manifest[0].length);  // cumulative number of ballots in batches
            manCum[0] = 0;
            for (var i=1; i < manifest[0].length; i++) {
               manCum[i] = manCum[i-1] + manifest[1][i-1];
            }
            var lookUp = new Array(3); // ballot (absolute numbering), batch, identifier_in_batch
            lookUp[0] = whichBallots;
            lookUp[1] = new Array(whichBallots.length);
            lookUp[2] = new Array(whichBallots.length);
            for (var i = 0; i < whichBallots.length; i++) {
                var j = 0;
                while (manCum[j] < whichBallots[i]) {
                    j++;
                }
                j--;
                lookUp[1][i] = manifest[0][j];
                if (typeof(manifest[2][j]) == 'object') {
                    lookUp[2][i] = manifest[2][j][whichBallots[i] - manCum[j] - 1];
                } else {
                    lookUp[2][i] = whichBallots[i] - manCum[j] + manifest[2][j] - 1;
                }
            }
            var str = 'sorted_number, ballot, batch_label, which_ballot_in_batch\n';
            for (var i=0; i < lookUp[0].length; i++ ) {
                str += (i+1).toString() + ', ' + lookUp[0][i].toString() + ', ' +
                       lookUp[1][i].toString() + ', ' + lookUp[2][i].toString() + '\n';
            }
        } else {
            str = 'The manifest cannot be parsed.\n' +
                  'Be sure that the each line of the manifest consists of a batch ' +
                  'label followed by a comma and a number or ' +
                  'a colon-separated ballot range or a list of identifiers in parentheses. ' +
                  'There must be exactly one comma per line.\n';
            $("#manifest").val(str + $("#manifest").val());
        }
        $("#lookUp").val(str);
    }

var manifest = null;

    function parseManifest() {
        var stuff = $("#manifest").val().replace(/\n+/gi,'\n').split('\n');
        var grabBagRegExp = /^ *\(.+\) *$/i
        var batches = new Array(3);
        batches[0] = new Array();  // batch labels
        batches[1] = new Array();  // number of ballots in the batch
        batches[2] = new Array();  // number of the first ballot in the batch, or an array of identifiers
        success = true;
        var j = 0;
        for (var i=0; i < stuff.length; i++) {
            if (typeof(stuff[i]) == 'undefined' || stuff[i] == null || stuff[i] == '') {
               continue;
            } else if (stuff[i].indexOf(',') < 0) {
               alert('Error! Line ' + (i+1).toString() + ' of the manifest has no commas: ' +
                      stuff[i].toString());
               success = false;
            }  else {
               var dum = stuff[i].split(',');
               if (dum.length != 2) {
                   alert('Error! Line ' + (i+1).toString() + ' of the manifest does not parse: ' +
                         stuff[i].toString() +
                         ' Be sure it has exactly one comma, separating the label from the ' +
                         'number of ballots or the ballot range.' );
                   success = false;
               } else {
                   batches[0][j] = dum[0];
                   if (dum[1].indexOf(':') >=  0) {
                         var mRange = dum[1].split(':');
                         batches[1][j] = parseInt(mRange[1]) - parseInt(mRange[0]) + 1;
                         batches[2][j] = parseInt(mRange[0]);
                   } else if (grabBagRegExp.test(dum[1])) {
                         batches[2][j] = new Array();
                         batches[2][j] = dum[1].replace(/( *\( *| *\) *)/g,'').replace(/ +/g,' ').split(' ');
                         batches[1][j] = batches[2][j].length;
                   } else {
                         batches[1][j] = parseInt(dum[1]);
                         batches[2][j] = 1;
                   }
                   j++;
               }
            }
        }
        if (success) {
            manifest = batches;
        } else {
            manifest = null;
        }
        return(success);
    }

//  General-purpose utilities

        function numberLessThan(a,b) { // numerical ordering for javascript sort function
            var diff = parseFloat(a)-parseFloat(b);
            if (diff < 0) {
                return(-1);
            } else if (diff == 0) {
               return(0);
            } else {
               return(1);
            }
         }

        function sortMultiple(list,order) { // sort a list, tabulate multiplicity of items. list is unchanged
            var ans = null;
            if (list.length > 0) {
                var temp = list.slice();
                if (typeof(order) != 'undefined' && order != null) {
                   temp.sort(order);
                } else {
                   temp.sort();
                }
                ans = new Array(2);
                ans[0] = new Array();
                ans[1] = new Array();
                ans[0][0] = temp[0];
                ans[1][0] = 1;
                for (var i=1; i < temp.length; i++) {
                   if (temp[i] == ans[0].slice(-1)) {
                       ans[1][ans[1].length-1]++;
                   } else {
                       ans[0].push(temp[i]);
                       ans[1].push(1);
                   }
                }
            }
            return(ans);
        }

        function findRepeats(list) { // find elements with multiplicity greater than one
                                     // in an array generated by sortMultiple()
            var ans = new Array(2);
            ans[0] = new Array();
            ans[1] = new Array();
            for (var i = 0; i < list[0].length; i++) {
                if (list[1][i] > 1) {
                   ans[0].push(list[0][i]);
                   ans[1].push(list[1][i]);
                }
            }
            return(ans);
        }

        function arrayToString(arr) { // formats an array
            var str = '';
            var cols = arr.length;
            var rows = arr[0].length;
            for (var j=0; j < rows; j++) {
                for (var i=0; i < cols; i++) {
                    str+= arr[i][j] + ',';
                }
                str = str.replace(/,$/,'\n');
            }
            return(str);
        }

    function vCum(list) { // vector of cumulative sum
        var list2 = list;
        for (var i = 1; i < list.length; i++ ) {
            list2[i] += list2[i-1];
        }
        return(list2);
    }

    function vMinMax(list){ // returns min and max of list
        var mn;
        var mx;
        if (list.length == 'undefined' || list.length == 0) {
           mn = list;
           mx = list;
        } else {
           mn = list[0];
           mx = list[0];
           for (var i=1; i < list.length; i++) {
               if (mn > list[i]) mn = list[i];
               if (mx < list[i]) mx = list[i];
           }
        }
        var vmnmx =  new Array(mn,mx);
        return(vmnmx);
    }

    function vSum(list) { // computes the sum of the elements of list
        var tot = 0.0;
        for (var i = 0; i < list.length; i++) {
            tot += list[i];
        }
        return(tot);
    }

    function removeAllBlanks(s){
        return(s.replace(/ +/gm,''));
    }

    function commify(num) { // punctuate number strings greater than 1,000 in magnitude
        var str;
        var strA = (removeAllBlanks(num.toString())).toLowerCase();
        if ( (strA.indexOf('e') > -1) || (strA.indexOf('d') > -1) ) {
            str = strA;  // don't mess with exponential notation
        } else {
            str = strA;
            var curLoc = str.length;
            if ( str.indexOf('.') > -1 ) {
                curLoc = str.indexOf('.');
            }
            var negSign = str.indexOf('-');
            for (var loc = curLoc-4; loc > negSign; loc -= 3) {
                str = str.substr(0,loc+1) + ',' + str.substr(loc+1, str.length);
            }
        }
        return(str);
    }

    function parsePercent(s) {
    // parse a number that contains a % sign to turn it into a decimal fraction
        var value;
        if (s.indexOf('%') == -1) {
            value = parseFloat(trimBlanks(removeCommas(s)))
        } else {
            while (s.indexOf('%') != -1) {
                s = s.substring(0,s.indexOf('%')) +
                    s.substring(s.indexOf('%')+1,s.length)
            }
            value = parseFloat(trimBlanks(removeCommas(s)))/100;
        }
        return(value);
    }

    function roundToDig(num, dig) { // rounds a number or list to dig digits after the decimal place
        var powOfTen = Math.pow(10,dig);
        if ((typeof(num)).toLowerCase() == 'number') {
            var fmt = Math.round(num*powOfTen)/powOfTen;
            return(fmt);
        } else if ((typeof(num)).toLowerCase() == 'object' ||
                   (typeof(num)).toLowerCase() == 'array') {
            var fmt = new Array(num.length);
            for (var i = 0; i < num.length; i++) {
                fmt[i] = Math.round(num[i]*powOfTen)/powOfTen;
            }
            return(fmt);
        } else {
            alert('Error #1 in roundToDig(): argument (' + num.toString() + ') is not a number or an array');
            return(Math.NaN);
        }
    }

    function doubleToStr(num,dig) {
      // returns a string representation of num, rounded to dig digits after the decimal
        return(removeAllBlanks(roundToDig(num,dig).toString()));
    }

    function removeCommas(s) { // removes commas from a string
        return(s.replace(/,/gm,''));
    }

    function trimBlanks(s) { // remove leading and trailing spaces
        s = s.replace(/^ +/gm,'');
        s = s.replace(/ +$/gm,'');
        return(s);
    }
});
