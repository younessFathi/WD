async function getSelectedTextTraduction(selectedText){
    const url = `https://api.wordnik.com/v4/word.json/${selectedText}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=c23b746d074135dc9500c0a61300a3cb7647e53ec2b9b658e`;
    let response = await fetch(url);
    let result = await response.json();
    console.log('result ' , result[0]);
    return result[0];
}
function createElement(text , x , y){
    const _div = document.createElement('div');
    _div.style.width = 'auto';
    _div.style.height = 'auto';
    _div.style.background = 'rgba(0,0,0,.4)';
    _div.style.textAlign = 'center';
    _div.style.padding = '5px 3px';
    _div.style.borderRadius = '6px';
    _div.style.zIndex = '1';
    _div.style.color = 'white';
    _div.style.position = "absolute";
    const textLength = text.length;
    _div.style.left = `${x-textLength/4}px`;
    _div.style.top = `${y+8}px`;
    _div.innerHTML = text;
    _div.classList.add('infoBulle');
    return _div;
}
document.addEventListener('mouseup' , async (e)=>{
    let selection = (document.all) ? document.selection.createRange().text : document.getSelection();
    if(selection && selection.anchorNode){
        const text = selection.anchorNode.data;
        const baseOffset = selection.baseOffset;
        const extentOffset = selection.extentOffset;
        document.querySelectorAll('.infoBulle').forEach((a)=>{
            a.remove()
        });
        if(text){
            const selectedText = text.substring(baseOffset , extentOffset);
            if(selectedText && selectedText.length !==0){
                const textTraduction = await getSelectedTextTraduction(selectedText);
                let text = 'definition not found';
                if(textTraduction){
                     text = textTraduction.text;  
                }
                document.body.append(createElement(text , e.pageX , e.pageY));
            }
        }
    }
});


