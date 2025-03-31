import * as _ from "soil-ts";
_.setUndoGroup("collectFile", collectFile);
/**
 * 用于收集文件，规定"C_Folder", "C_Comp", "C_Video", "C_Audio", "C_Image", "C_Text"6个文件夹，
 * 将所有文件按类型分类，并存入对应的文件夹中。
 * 如果未找到文件夹会进行生成，找到就会调用并存入。（只识别第一层的文件夹是否存在模板文件夹）
 * @author GFred
 */
function collectFile() {
  let collName = ["C_Folder", "C_Comp", "C_Video", "C_Audio", "C_Image", "C_Text"];
  let findFolder = false,
    findComp = false,
    findVideo = false,
    findAudio = false,
    findImage = false,
    findText = false;
  let C_Folder, C_Comp, C_Video, C_Audio, C_Image, C_Text;

  //1先收文件夹
  //找
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    if (
      app.project.rootFolder.items[i] instanceof FolderItem &&
      app.project.rootFolder.items[i].name == collName[0]
    ) {
      findFolder = true;
      C_Folder = app.project.rootFolder.items[i];
      break;
    }
  } 
  if (findFolder == false) {
    C_Folder = app.project.items.addFolder(collName[0]) as FolderItem;
  }
  //存
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    if (
      app.project.rootFolder.items[i] instanceof FolderItem &&
      app.project.rootFolder.items[i].name != collName[0]&&
      app.project.rootFolder.items[i].name != collName[1]&&
      app.project.rootFolder.items[i].name != collName[2]&&
      app.project.rootFolder.items[i].name != collName[3]&&
      app.project.rootFolder.items[i].name != collName[4]&&
      app.project.rootFolder.items[i].name != collName[5]
    ) {
      app.project.rootFolder.items[i].parentFolder = C_Folder;
    }
  }
  //2再收合成、视频、音频、图片
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    if (
      app.project.rootFolder.items[i] instanceof FolderItem &&
      app.project.rootFolder.items[i].name == collName[1]
    ) {
      findComp=true;
      C_Comp = app.project.rootFolder.items[i];
    }
  }
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    if (
      app.project.rootFolder.items[i] instanceof FolderItem &&
      app.project.rootFolder.items[i].name == collName[2]
    ) {
      findVideo=true;
      C_Video = app.project.rootFolder.items[i];
    }
  }
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    if (
      app.project.rootFolder.items[i] instanceof FolderItem &&
      app.project.rootFolder.items[i].name == collName[3]
    ) {
      findAudio=true;
      C_Audio = app.project.rootFolder.items[i];
    }
  }
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    if (
      app.project.rootFolder.items[i] instanceof FolderItem &&
      app.project.rootFolder.items[i].name == collName[4]
    ) {
      findImage=true;
      C_Image = app.project.rootFolder.items[i];
    }
  }
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    if (
      app.project.rootFolder.items[i] instanceof FolderItem &&
      app.project.rootFolder.items[i].name == collName[5]
    ) {
      findText=true;
      C_Text = app.project.rootFolder.items[i];
    }
  }
  //
  if (findComp == false) {
    C_Comp = app.project.items.addFolder(collName[1]);
  }
  if (findVideo == false) {
    C_Video = app.project.items.addFolder(collName[2]);
  }
  if (findAudio == false) {
    C_Audio = app.project.items.addFolder(collName[3]);
  }
  if (findImage == false) {
    C_Image = app.project.items.addFolder(collName[4]);
  }
  if (findText == false) {
    C_Text = app.project.items.addFolder(collName[5]);
  }

  /**
   * 收集文件
   */
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    //合成
    let itm = app.project.rootFolder.items[i] as CompItem;
    if (itm instanceof CompItem) itm.parentFolder = C_Comp;
  }
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    //图片
    let itm = app.project.rootFolder.items[i] as FootageItem;
    if (itm.hasVideo == true && itm.hasAudio == false && itm.name.match(/.png|.jpg|.jpeg|.psd|.ai/gi) != null)
      itm.parentFolder = C_Image;
  }
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    //视频
    let itm = app.project.rootFolder.items[i] as FootageItem;
    if (itm.hasVideo == true && itm.name.match(/.mp4|.mov|.avi|.flv|.wmv|.rmvb|.mkv|.webm/gi) != null)
      itm.parentFolder = C_Video;
  }
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    //音频
    let itm = app.project.rootFolder.items[i] as FootageItem;
    if (itm.hasAudio == true && itm.hasVideo == false && itm.name.match(/.mp3|.wav|.flac/gi) != null)
      itm.parentFolder = C_Audio;
  }
  for (let i = app.project.rootFolder.items.length; i >= 1; i--) {
    //文本
    let itm = app.project.rootFolder.items[i] as FootageItem;
    if (itm.hasVideo == false && itm.hasAudio == false && itm.name.match(/.txt|.md|.pdf|.json/gi) != null)
      itm.parentFolder = C_Text;
  }
}
function getOrCreateFolder(folderName) {
  for (var i = 1; i <= app.project.rootFolder.numItems; i++) {
    var item = app.project.rootFolder.item(i);
    if (item instanceof FolderItem && item.name === folderName) {
      return item;
    }
  }
  return app.project.rootFolder.items.addFolder(folderName);
}
// function collectFile() {
//   let sumFd = app.project.items.addFolder("SUM");
//   let sumID = sumFd.id;
//   for (let i = app.project.rootFolder.numItems; i > 0; i--) {
//     let item = app.project.rootFolder.items[i];
//     if (item.id != sumID) item.parentFolder = app.project.itemByID(sumID) as FolderItem;
//   }
//   //1 CreatFolder
//   let myFolder = ["Collect_Folder", "Collect_Comp", "Collect_Video", "Collect_Audio", "Collect_Image"];
//   let fdG = [];
//   _.eachItems(app.project, (item, index) => {
//     if (!(item.name == "SUM" || item.parentFolder.name == "SUM")) {
//       if (_.isFolderItem(item)) {
//         fdG.push(item.name);
//       }
//     }
//   });
//   let find = [0, 0, 0, 0, 0]; //记录哪个文件夹要创建
//   for (let i = 0; i < myFolder.length; i++) {
//     if (_.indexOf(fdG, myFolder[i]) == -1) find[i] = 1;
//   }
//   let idd = [0, 0, 0, 0, 0]; //初始化id记录
//   for (let i = 0; i < find.length; i++) {
//     if (find[i] == 1) {
//       let fd = app.project.items.addFolder(myFolder[i]);
//       idd[i] = fd.id; //记录item的id
//     }
//   }
//   // alert(idd);
//   // 2 CollectFile
//   try {
//     _.eachItems(sumFd, (item, index) => {
//       if (_.isFolderItem(item)) {
//         if (myFolder.toString().indexOf(item.name) == -1) {
//           //排除上面创建的文件夹
//           // item.parentFolder = getOrCreateFolder(myFolder[0]);
//           item.parentFolder = app.project.itemByID(idd[0]) as FolderItem;
//         }
//       } //文件夹
//       else if (_.isCompItem(item)) {
//         item.parentFolder = app.project.itemByID(idd[1]) as FolderItem;
//       } //合成
//       else if (_.isFootageItem(item) && item.hasAudio == true) {
//         item.parentFolder = app.project.itemByID(idd[2]) as FolderItem;
//       } //视频
//       else if (_.isFootageItem(item) && item.hasAudio == true && item.hasVideo == false) {
//         item.parentFolder = app.project.itemByID(idd[3]) as FolderItem;
//       } //音频
//       else if (
//         _.isFootageItem(item) &&
//         item.hasAudio == false &&
//         item.hasVideo == true &&
//         item.name.match(/png|jpg|jpeg/g) != null
//       ) {
//         item.parentFolder = app.project.itemByID(idd[4]) as FolderItem;
//       } //Image：有视频无音频
//     });
//   } catch (e) {
//     writeLn(e.line + e.message);
//   }
//   return;
// }

// function collectFile() {
//   let myFolder = ["Collect_Folder", "Collect_Comp", "Collect_Video", "Collect_Audio", "Collect_Image"];
//   let itm = app.project.rootFolder.items;
//   for (let i = 1; i <= itm.length; i++) {}
// }
