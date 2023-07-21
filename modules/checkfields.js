exports.checkFields =(body,requiredFields) => {
    
        // Nesnenin tüm alanlarını dizi olarak alıyoruz
        const objectFields = Object.keys(body);
        
        // Tüm istenen alanların, nesnenin alanları içerisinde olup olmadığını kontrol ediyoruz
        for (const field of requiredFields) {
          if (!objectFields.includes(field)) {
            return false;
          }
        }
        return true;
}