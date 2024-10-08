new Vue({
   el: '#vigenere',
   data: {
      alphabet_array: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "\'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", "/", ":", "<", ">", "|", "+", "=", " "],
      is_encrypting: 'true',
      message: 'Это секретное сообщение, которое нужно зашифровать! Чтобы расшифровать приведенный ниже текст, вам понадобится приведенный ниже ключ. В противном случае вы получите полнейший мусор.',
      key: 'Good fortune'
   },
   methods: {
      convert_to_array: function(string) {
         return string.split('');
      },
      get_adjusted_key_array: function(item) {
         const item_index = this.alphabet_array.indexOf(item),
               before_index_array = this.alphabet_array.slice(0, item_index),
               after_index_array = this.alphabet_array.slice(item_index);
         
         return after_index_array.concat(before_index_array);
      }
   },
   computed: {
      current_mode: function() {
         return (this.is_encrypting === ("true" || true)) ? true : false;
      },
      message_array: function(){ return this.convert_to_array(this.message); },
      key_array: function(){ return this.convert_to_array(this.key); },
      key_adjusted_arrays: function() {
         let adjusted_arrays = [];
         
         this.key_array.forEach(item => adjusted_arrays.push(this.get_adjusted_key_array(item)));
         
         return adjusted_arrays;
      },
      encrypted_array: function() {
         const is_encrypting = this.current_mode,
               message_array = this.message_array,
               key_arrays = this.key_adjusted_arrays,
               alphabet_array = this.alphabet_array;
         
         let encrypted_array = message_array.map(function(item, index){
           const current_index = (index % key_arrays.length),
                 current_key_array = key_arrays[current_index];

            if (is_encrypting) {
               const alphabet_index = alphabet_array.indexOf(item),
                     encrypted_character = current_key_array[alphabet_index];
               
               return encrypted_character;
            } else {
               const encrypted_index = current_key_array.indexOf(item),
                     decrypted_character = alphabet_array[encrypted_index];
               
               return decrypted_character;
            }
         });
         
         return encrypted_array;
      },
      encrypted_message: function() {
         const is_encrypting = this.current_mode,
               encrypted_array = this.encrypted_array;
         
         let final_message = encrypted_array.reduce(function(acc, char, index) {
           acc += char;     
           return acc; // Может также возвращать другие значения на основе массива
         }, '');
         
         if (!is_encrypting) {
            final_message = final_message;
         }
         
         return final_message;
      }
   }
});
