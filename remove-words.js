//include jQuery in chrome console/firebug
var jq = document.createElement('script'); 
jq.src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

//100 most common english words + are, is, where, was
var remove = ['are', 'is', 'where', 'was', 'the', 'be', 'to', 'of', 'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with',
              'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there',
			  'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
			  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
			  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'];

//var remove2 = ['programming', 'computer'];			  

var div = '#content';
			  
var words = getDivWords(div);
var wordCount = countWords(words, remove); 
var wordCountSorted = Object.keys(wordCount).sort(function(a,b){return wordCount[b]-wordCount[a]}); //sort words by # of occurrences desc

replaceWords(wordCountSorted, div, 25);

//get words from a div
function getDivWords(div){
  var content = jQuery(div).html(); 
  var contentText = jQuery(content).text(); //remove html tags
  
  contentText = contentText.toLowerCase(); //change to lower case for easier comparison
  contentText = contentText.replace(/[^A-Za-z\s]|_/g, "") //removes everything except characters and whitespace
                           .replace(/\s+/g, " "); //convert multiple spaces/newline to single spaces.
						   
  var words = contentText.match(/[^\s]+/g); //separate each word and push to array
  
  return words;
}

//create hash with key = word, value = # of occurrences, skip words in remove array or words with length = 1
function countWords(words, remove){ 
  var wordCount = { }; 
  for (var i=0; i<words.length; i++) {
    if(words[i].length > 1 && jQuery.inArray(words[i], remove) < 0){
      wordCount[words[i]] = (wordCount[words[i]] || 0) + 1;
    }
  }

  return wordCount;
}

//replace top x words in div with count
function replaceWords(sortedWords, div, top){ 
  var word;
  var re;
  for (var i=0; i<top; i++ ) { 
   word = '\\b' + sortedWords[i] + '\\b(?!([^<]+)?>)'; //regex for word not inside html tags
   re = new RegExp(word, 'ig');
   jQuery(div).html( jQuery(div).html().replace(re, wordCount[sortedWords[i]]) );
   console.log(sortedWords[i] + ': ' + wordCount[sortedWords[i]]);
  }
}