// 2025/3/31 23:07:44
/**
 * 用于收集文件，规定"C_Folder", "C_Comp", "C_Video", "C_Audio", "C_Image", "C_Text"6个文件夹，
 * 将所有文件按类型分类，并存入对应的文件夹中。
 * 如果未找到文件夹会进行生成，找到就会调用并存入。（只识别第一层的文件夹是否存在模板文件夹）
 * @author GFred
 */
(function() {
    function setUndoGroup(undoString, func) {
        app.beginUndoGroup(undoString);
        func();
        app.endUndoGroup();
    }
    setUndoGroup("collectFile", collectFile);
    function collectFile() {
        var collName = [ "C_Folder", "C_Comp", "C_Video", "C_Audio", "C_Image", "C_Text" ];
        var findFolder = false, findComp = false, findVideo = false, findAudio = false, findImage = false, findText = false;
        var C_Folder, C_Comp, C_Video, C_Audio, C_Image, C_Text;
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            if (app.project.rootFolder.items[i] instanceof FolderItem && app.project.rootFolder.items[i].name == collName[0]) {
                findFolder = true;
                C_Folder = app.project.rootFolder.items[i];
                break;
            }
        }
        if (findFolder == false) {
            C_Folder = app.project.items.addFolder(collName[0]);
        }
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            if (app.project.rootFolder.items[i] instanceof FolderItem && app.project.rootFolder.items[i].name != collName[0] && app.project.rootFolder.items[i].name != collName[1] && app.project.rootFolder.items[i].name != collName[2] && app.project.rootFolder.items[i].name != collName[3] && app.project.rootFolder.items[i].name != collName[4] && app.project.rootFolder.items[i].name != collName[5]) {
                app.project.rootFolder.items[i].parentFolder = C_Folder;
            }
        }
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            if (app.project.rootFolder.items[i] instanceof FolderItem && app.project.rootFolder.items[i].name == collName[1]) {
                findComp = true;
                C_Comp = app.project.rootFolder.items[i];
            }
        }
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            if (app.project.rootFolder.items[i] instanceof FolderItem && app.project.rootFolder.items[i].name == collName[2]) {
                findVideo = true;
                C_Video = app.project.rootFolder.items[i];
            }
        }
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            if (app.project.rootFolder.items[i] instanceof FolderItem && app.project.rootFolder.items[i].name == collName[3]) {
                findAudio = true;
                C_Audio = app.project.rootFolder.items[i];
            }
        }
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            if (app.project.rootFolder.items[i] instanceof FolderItem && app.project.rootFolder.items[i].name == collName[4]) {
                findImage = true;
                C_Image = app.project.rootFolder.items[i];
            }
        }
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            if (app.project.rootFolder.items[i] instanceof FolderItem && app.project.rootFolder.items[i].name == collName[5]) {
                findText = true;
                C_Text = app.project.rootFolder.items[i];
            }
        }
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
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            var itm = app.project.rootFolder.items[i];
            if (itm instanceof CompItem) {
                itm.parentFolder = C_Comp;
            }
        }
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            var itm = app.project.rootFolder.items[i];
            if (itm.hasVideo == true && itm.hasAudio == false && itm.name.match(/.png|.jpg|.jpeg|.psd|.ai/gi) != null) {
                itm.parentFolder = C_Image;
            }
        }
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            var itm = app.project.rootFolder.items[i];
            if (itm.hasVideo == true && itm.name.match(/.mp4|.mov|.avi|.flv|.wmv|.rmvb|.mkv|.webm/gi) != null) {
                itm.parentFolder = C_Video;
            }
        }
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            var itm = app.project.rootFolder.items[i];
            if (itm.hasAudio == true && itm.hasVideo == false && itm.name.match(/.mp3|.wav|.flac/gi) != null) {
                itm.parentFolder = C_Audio;
            }
        }
        for (var i = app.project.rootFolder.items.length; i >= 1; i--) {
            var itm = app.project.rootFolder.items[i];
            if (itm.hasVideo == false && itm.hasAudio == false && itm.name.match(/.txt|.md|.pdf|.json/gi) != null) {
                itm.parentFolder = C_Text;
            }
        }
    }
}).call(this);
