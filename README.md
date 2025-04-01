# 📚AEscript_itemFileCollect
Collect the project window files to the custom Folders.

![Snipaste_2025-04-01_00-19-59](https://github.com/user-attachments/assets/ef53a3b0-6aa5-4aca-aa1a-86dba43dc72a)

# 📚使用：
* 默认创建6个文件夹：
C_Folder,
C_Comp,
C_Audio,
C_Video,
C_Image,
C_Text

* 可放入Kbar/Sp-toolbar内使用 或 直接运行
* 运行先检查是否有这几个文件夹，如果有就进行索引然后放入文件，没有就新建

# 📚运行逻辑
* 文件收集
由于Project窗口会进行自动排列，如果从顶上删除文件，下方文件会自动往上移动进行对齐，因此不能用图层的逻辑进行循环操作，本脚本采用的是每一项均进行一次遍历，先检查FolderItem的名字和所属，查找是否存在自定文件夹，存在就指定变量名待用，不存在就新建。文件夹检查完依次检查其他项。
* 格式分类
格式是写死在脚本内的，
使用正则表达式索取常用的文件格式，未定义/未写入脚本的格式可能无法分类。
*需要修改可以查找替换，代码不算很多应该容易找到。

# 📚外部调用
使用了Soil-ts项目进行构建和编译。
