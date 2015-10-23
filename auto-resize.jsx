function main(){
    var srcFolder = Folder.selectDialog("フォルダを選択してください");
    if(!srcFolder){ return; }
    var distFolder = new Folder(srcFolder.fsName + "/out");
    if(!distFolder.exists){
        distFolder.create();
    }

    var files = srcFolder.getFiles("*.psd");
    for(i = 0 ; i < files.length ;i++){
        var f = new File(files[i]);
        open(f);

        var opt = new ExportOptionsSaveForWeb();
        opt.format = SaveDocumentType.PNG;
        opt.PNG8 = false;
        opt.interlaced = false;
    
        var distFile = new File(distFolder.fsName + "/" + f.name.replace(/\.psd$/, '.png'));

        //背景レイヤーを消す
        activeDocument.layers[activeDocument.layers.length - 1].visible = false; 

        activeDocument.resizeImage(512, 512, 72, ResampleMethod.BICUBICSHARPER);
        activeDocument.exportDocument(distFile, ExportType.SAVEFORWEB, opt);
        activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
}
main();
