url='http://localhost:3002/api/v1/'

data = {
    emailConfiguration:{
        product:'ABX',
        origin: 'mgoncalvez@intelix.biz',
        to: 'mgoncalvez@intelix.biz',
        type:1,
        actions:'olvido_password',
        var:[
          {
            name:'newPassword',
            value:'123123'
          }
        ]
      },
      newConfiguration : {
        products : 'ABX2',
        type : 1
      }
} 

module.exports = {
    url,
    data
}