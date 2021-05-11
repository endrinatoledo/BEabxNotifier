function ReplaceVariables(variables,template){

    if(variables){
        variables.forEach(element => {
            template=template.replace(`{{${element.name}}}`,element.value) 
        }); 
    }
    return template;

}


function ReplaceVariablesObj(variables,template){
    
    let element = {}
    template=template.replace(`{{${element}}}`,variables)   

    return template; 

}

module.exports = {
    ReplaceVariables,
    ReplaceVariablesObj
}