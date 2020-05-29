module.exports = {
    
    msgBlue:function(text) {
        console.log('\x1b[36m%s\x1b[0m', text);
    },
  
    msgRed: function(text) {
        console.log('\x1b[31m%s\x1b[0m', text);
    },

    msgGreen: function(text) {
        console.log('\x1b[32m%s\x1b[0m', text);
    },

    dateTime: function(text) {
        console.log('\x1b[32m%s\x1b[0m', text);
    },
  };

  