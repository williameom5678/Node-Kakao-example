const banWord = ["➡", "⬅", "⚠", "↘", "↙"];
client.on('chat', (data, channel) => {
  const sender = data.getSenderInfo(channel);
  if (!sender) return;
  
  var sex = contains1(banWord, data.text);
  if(sex == true){
    channel.hideChat(data.chat);
    channel.kickUser(sender);
    channel.sendChat(`${sender.nickname} 님을 밴했습니다.\n사유 : 허가되지 않은 단어 사용.`);
  }
  abcdefg=data._chat.attachment;
  hijklnm=abcdefg.mentions;
  if(abcdefg != undefined){
    if(/*data.text.indexOf("@")!=-1 && */hijklnm.length >= 35){
      channel.hideChat(data.chat);
      channel.kickUser(sender);
      channel.sendChat(`${sender.nickname} 님을 밴했습니다.\n사유 : 다수 멘션, 광고봇 의심.`);
    }else if(abcdefg == undefined || abcdefg == null){
      return;
    }
  }
});

const contains1 = (list, b) => {
  c=b.replace(/{!banWord}/g,"");
    for(let i in list) {
        if(b.indexOf(list[i])!=-1) return true;
    }
    return false;
}
