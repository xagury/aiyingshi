!function(l){function n(o,e){var n=this;n.config=e,n.codeList=[1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"],n.color=["#e3730f","#2ae3e0","#c317e3","#0e935f","#e30d65","#3c8b36","#74675a","#654321","#123345","#135784","#169b9a","#02468a"],n.bgColorList=["#b1b1b1","#e3d7cc","#d0d9f9","#f8f2d6"],n.bgColor="",n.code="",n.config?n.codeLen=n.config.len||4:n.codeLen=4;var t="",a=0;for(i=0;i<n.codeLen;i++){var c=Math.floor(Math.random()*n.codeList.length),r=Math.floor(Math.random()*n.color.length),d=Math.floor(Math.random()*n.bgColorList.length);a=c%2==0?c+Math.floor(Math.random()*r):-(c+Math.floor(Math.random()*r)),t+='<span style="padding:0 2px;color:'+n.color[r]+";display:inline-block;transform:rotate("+a+'deg);">'+n.codeList[c]+"</span>",n.code+=n.codeList[c],n.bgColor=n.bgColorList[d]}t+='<input placeholder="" value="'+n.code+'" type="hidden">',l(o).css({width:20*n.codeLen+"px",padding:"2px",textAlign:"center",display:"inline-block",fontSize:"14px",backgroundColor:n.bgColor,cursor:"pointer",opacity:.6}),l(o).empty().append(t)}l.fn.createCode=function(o){var e=this;n(e,o),l(e).click(function(){n(e,o)})}}(jQuery);