var tipuesearch = {"pages":[{"title":"树莓派搭建哔哩漫游解析服务器","url":"/2023/01/28/树莓派搭建哔哩漫游解析服务器/","text":"用树莓派搭建哔哩漫游服务器 准备: 懂得提问过程的脑子 会用搜索引擎的手 耐心 树莓派(或其他能长时间运行的计算机) 魔法 域名 一点点Linux知识 第一步 准备工作 域名:有许多免费申请域名的方法,Bing搜索都有,这里不再赘述,不过比起免费还是建议去购买域名,一年最多就几十块,不算很贵 树莓派:这里我安装了Ubuntu 22.04.1 LTS,下文的许多指令不确定在Ubuntu以外的操作系统有效,尽情留意 魔法:懂的都懂,没有的可以散伙了,建议用付费的,比较稳定,详细的我也不敢说,我怕备案掉了,不过后文的配置文件会提一嘴 第二步 环境搭建 Go编译器安装 我们在这里采用手动安装的方式,因为不确定apt是否能安装到最新的稳定版本 先从此处找到合适的软件包(因为是树莓派所以选择linux-arm64),右键复制链接 wget &lt;下载网址&gt; &amp;&amp; tar -C /usr/local -xzf &lt;下载文件名&gt; 如果下载慢或无法下载,请使用魔法或者使用此处镜像(本人不保证该资源安全,请自行校验或选择可信镜像站) 然后编辑/etc/environment,在path变量后加上/usr/local/go/bin 最后执行go version,如果是类似以下的输出结果则为安装成功 go version go1.19.4 linux/arm64 安装PostgreSQL[1] 一行命令 apt-get install postgresql postgresql-client 装完后进入PostgreSQL psql -h localhost -p 5432 -U postgres 如果显示类似如下错误信息: psql: error: connection to server on socket &quot;/var/run/postgresql/.s.PGSQL.5432&quot; failed: FATAL: role &quot;root&quot; does not exist 请使用以下指令再试一遍: sudo -u postgres psql -h localhost -p 5432 -U postgres 修改登录密码(password112233修改为你喜欢的任意字符) ALTER USER postgres WITH PASSWORD 'password112233'; 创建并进入数据库 CREATE DATABASE bili; \\c bili; 初始化数据库,复制这个页面内所有内容后粘贴即可(请务必进行这一步,否则后续可能报错) 如果解析服务器搭建后你想查看使用的用户详情的话建议你安装一个pgadmin4 使用docker安装会比较舒服,同时还推荐一个家庭云管理,说是家庭云,其实就像一个小型的docker容器可视化管理器 sock5端口的建立 这是关于魔法的部分,如果没有魔法请自行离开 使用某ray软件,配置文件[2]仅供参考 &#123; &quot;log&quot;: &#123; &quot;loglevel&quot;: &quot;warning&quot; &#125;, &quot;inbounds&quot;: [ &#123; &quot;listen&quot;: &quot;127.0.0.1&quot;, &quot;port&quot;: 7465, &quot;protocol&quot;: &quot;socks&quot;, &quot;setting&quot;: &#123; &quot;auth&quot;: &quot;noauth&quot;, &quot;udp&quot;: true &#125;, &quot;tag&quot;: &quot;gotw&quot; &#125;, &#123; &quot;listen&quot;: &quot;127.0.0.1&quot;, &quot;port&quot;: 7466, &quot;protocol&quot;: &quot;socks&quot;, &quot;setting&quot;: &#123; &quot;auth&quot;: &quot;noauth&quot;, &quot;udp&quot;: true &#125;, &quot;tag&quot;: &quot;gohk&quot; &#125;, &#123; &quot;listen&quot;: &quot;127.0.0.1&quot;, &quot;port&quot;: 7467, &quot;protocol&quot;: &quot;socks&quot;, &quot;setting&quot;: &#123; &quot;auth&quot;: &quot;noauth&quot;, &quot;udp&quot;: true &#125;, &quot;tag&quot;: &quot;goth&quot; &#125; ], &quot;outbounds&quot;: [ &#123; //Paste your TW config here &quot;protocol&quot;: &quot;trojan&quot;, &quot;settings&quot;: &#123; &quot;servers&quot;: [ &#123; &quot;address&quot;: &quot;&quot;, &quot;port&quot;: , &quot;password&quot;: &quot;&quot; &#125; ] &#125;, &quot;streamSettings&quot;: &#123; &quot;network&quot;: &quot;tcp&quot;, &quot;security&quot;: &quot;tls&quot; &#125;, &quot;tag&quot;: &quot;taiwan&quot; &#125;, &#123; //Paste your HK config here &quot;protocol&quot;: &quot;trojan&quot;, &quot;settings&quot;: &#123; &quot;servers&quot;: [ &#123; &quot;address&quot;: &quot;&quot;, &quot;port&quot;: , &quot;password&quot;: &quot;&quot; &#125; ] &#125;, &quot;streamSettings&quot;: &#123; &quot;network&quot;: &quot;tcp&quot;, &quot;security&quot;: &quot;tls&quot; &#125;, &quot;tag&quot;: &quot;hongkong&quot; &#125;, &#123; //Paste your TH config here &quot;protocol&quot;: &quot;trojan&quot;, &quot;settings&quot;: &#123; &quot;servers&quot;: [ &#123; &quot;address&quot;: &quot;&quot;, &quot;port&quot;: , &quot;password&quot;: &quot;&quot; &#125; ] &#125;, &quot;streamSettings&quot;: &#123; &quot;network&quot;: &quot;tcp&quot;, &quot;security&quot;: &quot;tls&quot; &#125;, &quot;tag&quot;: &quot;thailand&quot; &#125; ], &quot;routing&quot;: &#123; &quot;domainStrategy&quot;: &quot;AsIs&quot;, &quot;rules&quot;: [ &#123; &quot;type&quot;: &quot;field&quot;, &quot;inboundTag&quot;: [ &quot;gotw&quot; ], &quot;outboundTag&quot;: &quot;taiwan&quot; &#125;, &#123; &quot;type&quot;: &quot;field&quot;, &quot;inboundTag&quot;: [ &quot;gohk&quot; ], &quot;outboundTag&quot;: &quot;hongkong&quot; &#125;, &#123; &quot;type&quot;: &quot;field&quot;, &quot;inboundTag&quot;: [ &quot;goth&quot; ], &quot;outboundTag&quot;: &quot;thailand&quot; &#125; ] &#125; &#125; 内网穿透 使用ddns也可以,只要你有方法使你的网站能在外网被访问就可以 这里使用的是Sakura frp 你也可以使用其他内网穿透服务,详情请自行搜索 注册账号等不再赘述 新建隧道,选择可建站的节点 注意:海外节点可能被墙无法访问,国内节点需要域名备案,请理清需求条件后再使用,否则请使用其他内网穿透服务 除了节点选择以外按照下图进行设置(建议在网络低峰期新建,因为高峰期节点满载就禁止新建了): 在此处下载客户端并上传至服务器 选择Linux-arm64 在用户信息处复制访问密钥登陆,然后选中隧道继续就可以了 之后可以用文末的方式进程保留在后台 (ps:目前比较好用的免费穿透服务我知道的就这一家,如果有推荐的更好的免费穿透服务的话建议在下面发出来,我很需要) 宝塔面板安装 非必要步骤,如果你了解Nginx配置和免费证书申请等网站搭建基本步骤请优先使用你的方法(因为宝塔安装Nginx太慢了,我用它纯纯是因为我是懒狗) 如果你对宝塔有意见的话可以试试mdserver-web,或者手动搭建Nginx服务和手动申请证书 因为写这篇文章的时候我已经用上宝塔了,所以文中就用宝塔进行演示了 此处复制粘贴指令即可 安装完后通过浏览器访问面板,提示lnmp安装的话只需要安装Nginx就可以了,由于是编译安装,所以时间可能比较久,你可以先干其他事 安装完成后新建站点,域名填你使用的域名,申请证书的部分网上也有步骤,我是懒狗懒得再复述一遍了 第三步 哔哩漫游goserver安装 mkdir biliroaming &amp;&amp; cd biliroaming新建和进入目录后克隆库 git clone https://github.com/JasonKhew96/biliroaming-go-server 如果下载缓慢或遇到其他网络问题,建议使用ghproxy的加速服务 git clone https://ghproxy.com/https://github.com/JasonKhew96/biliroaming-go-server 配置文件的编写[3] 参考此处 第4行因为要用反代,所以填个合适的端口就行 第68-73行根据某ray软件来编写,如果列表里有,注释掉你的树莓派所在地,及你没有的地区魔法 最后到第103行,host后改为127.0.0.1,password改为设定的密码的同时取消注释,并把passwordFile注释掉,dbName改为bili,至此改完并保存。 运行! 对于国内服务器,先执行 `export GOPROXY=https://goproxy.io,direct` 接着执行 go run . 若无报错则说明正常(Ctrl-C退出),若有报错请自行检查是否有遗漏。 运行后进入宝塔面板,进入网站新建反向代理,目标url填http://127.0.0.1:&lt;端口号&gt; 后台运行 没什么问题后就进入后台运行 使用screen,没有screen就装一个 使用 screen -S &lt;终端名&gt; 选择合适的终端名有利于出现问题时方便排查 进入后再次运行各个项目,然后Ctrl-A-D退出 恢复则使用 screen -r &lt;终端名&gt; 补充 如果你想要同时搭建网页请在biliroaming/html/目录下放置你的网页文件 不知是否支持动态网页,请自行实验 总结 你可以看看我建的 以上,如果有疑问的话欢迎留言 引用自 Yukie-记录一下哔哩漫游GO版搭建流程 因为我懒得再写一遍,就直接复制粘贴了 有稍作修改 ↩︎ 参考同上博客,有稍作修改 ↩︎ 部分参考同上 ↩︎","tags":"哔哩哔哩 哔哩漫游 服务器 技术"},{"title":"打扫博客","url":"/2022/08/28/打扫博客/","text":"打扫博客 打扫久未使用的房间非常累,整理久未使用的博客也一样 因为要把自己写的机器人的文档放上来,而且之前博客有一些东西&#x2F;功能我想加,所以就决定重新打理打理这个博客说着简单,其实打理了一整天,真的要命 1.万事开头难说是万事开头难,其实后面也没有简单多少,主要是我的技术栈不在nodejs这类似的语言上面,所以真的有点要命 npm包处理我刚建立这个博客的时候,用的这个主题还没有本地搜索的功能,当时就想着用各种方法来弄搜索功能,然而我当时对js啥的一窍不通 (现在也一样) ,所以就把搜索功能给搞残废了,到最后连修都修不回去,就直接放弃了 来打理的时候第一时间就想到这个,然后看到作者还在维护(作者人间之鉴),而且加了搜索和其他许多功能,一下子开心的不得了,以为之后会轻松许多 (然而等待我的其实是地狱) ,便开始按照文档安装: npm i hexo-theme-nexmoe@3.2.13 安装完之后打开配置文件(_config.nexmoe.yml)一看,新特性呢?飞了?我直接whats up 于是我开始尝试包括但不限于以下方式,都没成功: 删掉主题重装 通过msi更新了nodejs 卸载重装了nodejs 重启电脑 …… 就这样纠缠了接近两个小时,问题仍然没有解决,但浏览器标签页已经开了接近30页 (内存:你清高)我删掉了主题,删掉了同学的标签页,终于!(李纪哲&amp;同学:你有事?)在必应和谷歌之间反复横跳有了结果这篇文章教会了我怎么升级,分析之后我才明白我之前是多么傻 npm包在某一区域内是根据package.json这个文件来安装本区域包的意思就是我之前对这这个npm包管理器虚空打靶npm一滴血没掉,我:好厚的血 我通过下面的指令成功更新了主题,顺便连hexo也一起更新了 npm install -g npm-check-updates ncu // 查看可更新包 ncu -u // 更新package.json npm install // 升级到最新版本 上面的指令是ncu这个插件自动检测package.json这个文件里的包信息,并查找更新,然后更改这个文件,最后重新安装一遍就好了 不过主题的最新版本是4.0.0,配置文件的内容有许多不同,不过我通过修改package.json里的版本信息,重新安装就安装到了目标版本 2.我超!二次元我超!二次元!怎么会有人为了二次元捣鼓半天代码啊,妈妈让我不要跟傻卵二次元玩,啊,原来我就是啊,那没事了 其实是为了添加看板娘插件而一波三折,又研究挺久,还被迫捡回了一点我快忘光光了只学了一点点的js&#x2F;html live2d看板娘插件在我原来的博客中,里面有我插入的live2d看板娘插件,不过由于上一节的一些操作 (删掉主题重装的逆天操作) ,这些插件已经不复存在,需要重新配置然后我先上GitHub (全球最大同性交友网站) 搜了一下,最先看到的相关的插件是hexo的hexo-helper-live2d然后就按照文档开始造然后一个hexo g一个hexo s就开始部署,在本地就部署好了打开一看,生效是生效了,但这样还不够!(渊薮_Crowd:你有事吗?)功能确实太严重了,换模型,换衣,拍照等等功能都缺失了,真的就看板娘了,而且配置文件还不生效,无奈之下只能寻找其它办法 又在GitHub找了半天,中间还去必应找了几下,回到了起点文档的底下写了相关项目live2d-widget.js,点进去存档了,不过有另一个链接指向了现在仍在维护的live2d-widget(作者人间之鉴) 但是问题又随之而来,怎么添加文档说的很简单: 将这一行代码加入 &lt;head&gt; 或 &lt;body&gt;,即可展现出效果: &lt;script src=&quot;https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js&quot;&gt;&lt;/script&gt; 对js&#x2F;html一窍不通的我:?然后就开始搜索是什么意思,一开始还不太敢改,也不知道改哪里,怕跟上次一样改坏了我披星戴月,我奋不顾身,终于!(你这荔枝太假了)在node_modules文件夹中的文件夹海中找到了主题的文件夹,并且通过对比hexo生成的页面的html源码找到了主题的生成模板,依靠那渣都不剩的js&#x2F;html知识成功添加了看板娘,并且功能齐全嘿嘿,看板娘,小小的,香香的 修改后的代码如下: &lt;head&gt; &lt;link rel=&quot;stylesheet&quot; href=&quot;https://fastly.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/css/all.min.css&quot;&gt; &lt;script src=&quot;https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js&quot;&gt;&lt;/script&gt; ... &lt;/head&gt; 看板娘可爱捏 3.代码高亮,没有你我怎么活啊如果有人能用Windows自带的记事本写下几百行代码,那我可能会叫他爹黑底白字对于写代码来说有点难受,但对于看代码来说,也一样难受 代码高亮处理完上面的事情之后,我发现了一个严重的问题代码高亮没了,不仅没了,因为字体颜色和背景一样,就跟黑幕一样 继续翻文档,在常见问题里发现了这一条: 代码高亮自2.9.0版本后,需要在 _config.yml 文件中进行如下配置使用高亮 highlight: enable: true hljs: true auto_detect: true 更多内容:代码高亮 | Hexo 修改了配置文件,然而并没有什么卵用,只是变成了黑底白字,而且能看得更清楚了多了一些没对齐的行号 地狱又来了,为了解决搜了各种办法,什么装第三方插件啦,换另一个官方支持的代码高亮啦都没用 写入绝望中看到了希望,这篇文章的作者对于官方的highlight.js使用很失望,所以决定自己嵌入使用这个js脚本(我:作者你一定要幸福啊)搜索n小时,highlight.js治好了我的精神内耗不过由于与上一节一样的原因,并且加上搜索了半天脑子已经有点不清醒了,我还是找了十几分钟在哪修改?怎么跟看板娘的地方一样啊 修改后的代码如下: &lt;head&gt; &lt;link rel=&quot;stylesheet&quot; href=&quot;https://fastly.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/css/all.min.css&quot;&gt; &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/vs2015.min.css&quot;&gt; &lt;script src=&quot;https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js&quot;&gt;&lt;/script&gt; &lt;script src=&quot;https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js&quot;&gt;&lt;/script&gt; &lt;script src=&quot;https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js&quot;&gt;&lt;/script&gt; &lt;script&gt; hljs.initHighlightingOnLoad(); hljs.initLineNumbersOnLoad(); &lt;/script&gt; ... &lt;/head&gt; 顺便加了行号显示(参考博客),这个问题也是我后面才发现的,跟高亮一样的路线,不过搜索没花那么长时间就是了 (主要是我懒得再写一遍了)行号显示也有问题,有一些代码快和行号黏在一起了 (贴贴好耶) 不过我在修改article.styl之后就好多了: /* for block of numbers */ .hljs-ln-numbers &#123; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; text-align: center; color: #ccc; border-right: 10px solid #8000000F; vertical-align: top; padding-right: 20px; /* your custom style here */ &#125; /* for block of code */ .hljs-ln-code &#123; padding-left: 20px; &#125; 上面的代码是通过在代码和行号之间加了一条10px的透明线来实现分离的 (竟然拆散他们,24k你坏事做尽&amp;#x1F621;) 下面是效果图,感觉非常滴不戳: 还有一些小插曲,但是我懒得写了,简单描述下吧:使用完代码高亮后似乎和后面的背景颜色不同,然后通过修改styl文件解决了 4.can can need我的图片很大,你要忍一下↗~~ 图片大小在编写帮助文档的时候,发现一个问题图片太大在网站中似乎并不美观,于是我先用网上搜的办法尝试 (没错又是搜索地狱)先是这篇知乎回答,在markdown代码块后面追加css代码我的编辑器是显示有更改了,但生成代码后令人眼前一黑页面竟然把css源码原封不动的显示了出来 于是我开始寻求另一种解决方式,找到了一个脚本按照里面的方式部署完代码如下: &lt;body&gt; ... &lt;script src=&quot;https://gcore.jsdelivr.net/gh/bobcn/hexo_resize_image.js@latest/hexo_resize_image.js&quot;&gt;&lt;/script&gt; &lt;/body&gt; 然后再按照他的写法,引用图片这样引用:图片链接?缩放百分比生成!终于成功了,脚本作者,你做得好,你做的好啊 5.世界很大,我想要看看由于一些众所周知的原因,一些网站无法访问,或者访问困难而去年年底jsdelivr的备案被注销后,jsdelivr的资源获取便成了困难,他的链接也被DNS污染了而我写的文档面向的受众有很多都是没有科学上网知识的同学,所以打破这道阻碍也是很重要的事 更换CDN这件事情很简单,换CDN嘛不过GitHub库的CDN还真没几个,无奈之下,试了下fastly.jsdelivr.net不太行,随后又试了几个二级域名,最后发现gcore.jsdelivr.net可以使用,vscode全局替换就ok了 尾声这篇文章写了两天,在写这篇文章的时候还遇到了一些小瑕疵,左下的版权信息不是在指定位置换行,看的很难受,不过在经历历练之后,好好的修改了主题文件,就好了这篇文章也算是我重拾这个博客之后第一篇正经文章,要开学了,不知道这篇博客还有没有机会更新不过题材还是有的,是两个审核的故事,如果我有时间的话可能会继续写两个审核:工信部和腾讯机器人运营部 另:石蒜好看,千1是神","tags":"博客 npm hexo js"},{"title":"机器人帮助文档","url":"/2022/08/28/机器人帮助文档/","text":"欢迎来到海中bot帮助文档 观感提示:若部分图片未加载请多刷新几次部分设备显示比例可能有问题,点击图片可查看正常比例若仍存在问题,请联系我,或使用其他设备访问(建议使用电脑端访问) 在这里,你可以获得各个指令的用法至于为什么是在我的博客,原因还是我懒得再建一个文档网站 (虽然不要钱就是了) 签到用法:@海中bot /签到描述:签到,获得随机数量的一堂二堂三堂饭券效果图片:注:后续可能会增加抽卡功能,所以建议每天都来签签到\\ 顺便征集一二三堂菜名或其他内容作为抽卡项目 查询用法:@海中bot /查询描述:查询你所持有的一二三堂饭券效果图片:注:后续若添加了抽卡功能,还可查询所抽到的内容 天气用法:@海中bot /天气 [城市名](请注意指令后的空格,不可删除,否则会报错)使用效果:获取天气参数:城市名:选填,留空默认查询海口天气效果图片: 每日一图用法:@海中bot /每日一图 [图片类型](请注意指令后的空格,不可删除,否则会报错)使用效果:获取随机图片参数:图片类型:选填,可选二次元,留空默认获取美景图片效果图片: 注:有时候带二次元参数返回会比较慢,请耐心等待,或再试一遍,如下图: 土味骚话用法:@海中bot /土味骚话使用效果:获得随机土味情话或骚话效果图片: 查词用法:@海中bot /查词 [待查询词]使用效果:获取单词释义或语言参数:待查单词:必填,当语言为英语时,返回单词释义及有道词典链接,当语言为其他时,返回语言代码及有道词典链接效果图片: 视频解析用法:@海中bot /视频解析 [AV/BV号]使用效果:获取哔哩哔哩视频封面、下载链接参数:AV&#x2F;BV号:必填,哔哩哔哩视频AV&#x2F;BV号效果图片: 视频封面用法:@海中bot /视频封面 [AV/BV号]使用效果:获取哔哩哔哩视频封面参数:AV&#x2F;BV号:必填,哔哩哔哩视频AV&#x2F;BV号效果图片: 音乐下载用法:@海中bot /音乐下载 [网易云音乐id]使用效果:获取网易云音乐音频下载链接(注意:黑胶歌曲下载只有前30秒,无版权歌曲或其他歌曲自行测试)参数:网易云音乐id:必填,网易云音乐id,可在音乐分享链接里获取 管理员选项以下条目仅管理员可用,请注意自身权限 禁言用法:@海中bot /禁言 @禁言对象 [时间]使用效果:快速禁言某个成员,范围为整个频道参数:时间:选填,单位为秒,留空默认7200(两小时)(注意:此处填纯数字即可,不要带单位,否则会报错)效果图片: 解禁用法:@海中bot /解禁 @解禁对象使用效果:快速解禁某个成员,范围为整个频道效果图片: 全员禁言用法:@海中bot /全员禁言使用效果:快速全员禁言(注意:由于范围为整个频道而非子频道,所以非特殊情况请不要使用)效果图片: 全员解禁用法:@海中bot /全员解禁使用效果:快速全员解禁效果图片: 写在最后目前就写了这些功能,如果你有什么想添加的功能,可以在底下留言,或者通过QQ向我反馈感谢:@Developing. @怎么能有这么难学的东西 协助测试 突发奇想就写了这个机器人,也不知道会有多少人用(悲)","tags":"qq机器人 qq频道"},{"title":"刷题记录","url":"/2021/10/07/刷题记录/","text":"刷题记录1.P1179 [NOIP2010 普及组] 数字统计解题思路:声明一个整型变量,作为计数器,再计算两个值之间2的出现次数 核心代码: while(g!=0)&#123; if(g%10==2)ans++; g/=10; &#125; 我的代码:#include &lt;bits/stdc++.h&gt; using namespace std; int main()&#123; int l,r,ans=0; cin&gt;&gt;l&gt;&gt;r; for(int i=l;i&lt;=r;i++)&#123; int g=i; while(g!=0)&#123; if(g%10==2)ans++; g/=10; &#125; &#125; cout&lt;&lt;ans&lt;&lt;endl; return 0; &#125; 2.P1307 [NOIP2011 普及组] 数字反转解题思路:声明待输入数和输出数,输出数扩充一位给输入数最后一位,输入数再舍去最后一位 核心代码: for(na;na!=0;na/=10) nb=nb*10+na%10; 我的代码#include &lt;iostream&gt; using namespace std; int na,nb=0; int main()&#123; cin&gt;&gt;na; for(na;na!=0;na/=10) nb=nb*10+na%10; cout&lt;&lt;nb; &#125; 3.P1075 [NOIP2012 普及组] 质因数分解解题思路:从小到大轮流除,找到最小因数,质因数&#x2F;最小因数&#x3D;最大因数 核心代码: for(int i=2;i&lt;=n;++i)&#123; if(n%i==0)&#123; cout&lt;&lt;n/i; return 0; &#125; &#125; 我的代码:#include &lt;cstdio&gt; #include &lt;iostream&gt; using namespace std; int main()&#123; int n; cin&gt;&gt;n; for(int i=2;i&lt;=n;++i)&#123; if(n%i==0)&#123; cout&lt;&lt;n/i; return 0; &#125; &#125; &#125; 4.P1980 [NOIP2013 普及组] 计数问题解题思路:每个数都进行判断,使用计数器计数 核心代码: for(i=1;i&lt;=n;i++)&#123; temp=i; while(temp!=0)&#123; t=temp%10; temp/=10; if(t==x) c++; &#125; 我的代码:#include &lt;iostream&gt; using namespace std; int n,x,temp,i,t,c; int main()&#123; cin&gt;&gt;n&gt;&gt;x; for(i=1;i&lt;=n;i++)&#123; temp=i; while(temp!=0)&#123; t=temp%10; temp/=10; if(t==x) c++; &#125; &#125; cout&lt;&lt;c&lt;&lt;endl; return 0; &#125; 5.P2141 [NOIP2014 普及组] 珠心算测验解题思路:暴力查找 核心代码: for(i=1;i&lt;=n;i++)&#123; cin&gt;&gt;a[i]; tf[a[i]]++; &#125; for (i=1;i&lt;=n;i++)&#123; for(g=1+1;g&lt;=n;g++)&#123; ti[a[i]+a[g]]++; mn=max(mn,a[i]+a[g]); &#125; &#125; for(i=1;i&lt;=mn;i++)&#123; if(ti[i]&gt;0&amp;&amp;tf[i]) ans++; &#125; 我的代码:#include &lt;iostream&gt; #include &lt;cstdio&gt; using namespace std; const int M=20005; int ti[M],tf[M],n,a[205],ans,mn,i,g; int main()&#123; cin&gt;&gt;n; for(i=1;i&lt;=n;i++)&#123; cin&gt;&gt;a[i]; tf[a[i]]++; &#125; for (i=1;i&lt;=n;i++)&#123; for(g=1+1;g&lt;=n;g++)&#123; ti[a[i]+a[g]]++; mn=max(mn,a[i]+a[g]); &#125; &#125; for(i=1;i&lt;=mn;i++)&#123; if(ti[i]&gt;0&amp;&amp;tf[i]) ans++; &#125; cout&lt;&lt;ans; &#125; 6.P2669 [NOIP2015 普及组] 金币解题思路:自加,后减去超出部分 核心代码: for(i=1;k-i&gt;0;k-=i++)&#123; coin+=i*i; &#125; cout&lt;&lt;coin+k*i; 我的代码:#include &lt;cstdio&gt; #include &lt;iostream&gt; using namespace std; long long int k,i,coin; int main()&#123; cin&gt;&gt;k; for(i=1;k-i&gt;0;k-=i++)&#123; coin+=i*i; &#125; cout&lt;&lt;coin+k*i; &#125;","tags":"csp"},{"title":"海中信息学夏令营学习笔记&心得","url":"/2021/08/13/海中信息学夏令营学习笔记/","text":"海中信息学夏令营学习笔记&amp;心得第一天递归算法百度上的定义是在计算机科学中是指一种通过重复将问题分解为同类的子问题而解决问题的方法。有点难懂,但结合一些例子就容易理解了,比如:1.如何给一堆数字排序?答:分成两半,先排左半边再排右半边,最后合并就行了,至于怎么排左边和右边,请重新阅读这句话。2.简单来说,递归就是函数自己调用自己本身,以解决问题。 典型问题:汉诺塔问题 基础知识 这些知识主要靠记背,加油吧! 1、计算机的基本常识●计算机和信息社会(信息社会的主要特征、计算机的主要特征、数字通信网络的主要特征、数字化)●信息输入输出基本原理(信息交换环境、文字图形多媒体信息的输入输出方式)信息的表示与处理(信息编码、微处理部件MPU、内存储结构、指令,程序,和存储程序原理、程序的三种基本控制结构)●信息的存储、组织与管理(存储介质、存储器结构、文件管理、数据库管理)●信息系统组成及互连网的基本知识(计算机构成原理、槽和端口的部件间可扩展互连方式、层次式的互连结构、互联网络、TCP&#x2F;IP协议、HTTP协议、WEB应用的主要方式和特点)●人机交互界面的基本概念(窗口系统、人和计算机交流信息的途径(文本及交互操作))●信息技术的新发展、新特点、新应用等。 2、计算机的基本操作●WINDOWS和LINUX的基本操作知识●联网的基本使用常识(网上浏览、搜索和查询等)●常用的工具软件使用(文字编辑、电子邮件收发等) 3、程序设计的基本知识(1)、数据结构●程序语言中基本数据类型(字符、整数、长整数、浮点)●浮点运算中的精度和数值比较●一维数组(串)与线性表●记录类型(PASCAL)&#x2F;结构类型(C)(2)、程序设计●结构化程序设计的基本概念阅读理解程序的基本能力●具有将简单问题抽象成适合计算机解决的模型的基本能力●具有针对模型设计简单算法的基本能力●程序流程描述(自然语言&#x2F;伪码&#x2F;NS图&#x2F;其他)●程序设计语言(PASCAL&#x2F;C &#x2F; C++,)(3)、基本算法处理●初等算法(计数、统计、数学运算等)●排序算法(冒泡法、插入排序、合并排序、快速排序)●查找(顺序查找、二分法)●回溯算法 上面这些是初赛的考察范围,刚见到的时候,其实我是拒绝的。 这节课讲了计算机发展及应用、保护知识产权、计算机病毒、计算机系统的组成、计算机指令系统、计算机的数字系统、在计算机中带符号数的表示法、信息存储单位及计算机网络知识。(讲的好多,总结起来都有点害怕) 知识点:1.第一台电子计算机的诞生: ENIAC(1946,以约翰·莫克利、普雷斯伯·埃克特两人名字命名)2.第一台具有存储程序功能的计算机:EDVAC(冯·诺依曼(美籍匈牙利人),由运算器、控制器、存储器、输人设备和输出设备这五部分组成)3.EDVAC的进步:采用二进制、提出了“存储程序”4.图灵(英国人),发明了图灵机,提出图灵试验5.图灵奖(1966,美国计算机协会,纪念图灵为目的之一)(计算机界的诺贝尔奖,啥时候我也能拿)获得此奖的华人:姚期智(目前在清华,有清华姚班)6.世界上第一位软件工程师:Ada Lovelace(爱达)(英国诗人拜伦的女儿)7.中国第一个程序员:董铁宝(王选的老师,死于文革)8.计算机发展阶段:电子管(1946-1958)、晶体管(1958-1964)、中小规模集成电路(1964-1975)、大规模&#x2F;超大规模集成电路(1975-至今)9.计算机的运用:科学计算(数值计算)、数据处理(信息处理)、人工智能、自动控制、计算机辅助设计和制造(CAI计算机辅助教学、CAM计算机辅助制造、CAT计算机辅助测试、CAD计算机辅助设计、CAE计算机辅助教育、CIMS计算机集成制造系统)10.知识产权保护:法律文件《计算机软件保护条例》(此法用于保护软件的著作权)11.计算机病毒:功能比较特殊的计算机程序(特点:能够将复制在其他程序中;不以独立文件形式存在,仅依附于其他程序上)(是程序,不能感染人!)(谁都知道吧)12.硬件系统的组成:运算器、控制器、存储器、输入设备、输出设备13.运算器+控制器&#x3D;CPU(中央处理器)14.存储器:外存储器(硬盘、光盘、软盘、优盘等)、内存储器(ROM只读存储器、RAM随机存取存储器(平常说的运行内存))、高速缓存器:cache15.速度:高速缓存器&gt;内存&gt;外存16.rom是只读内存,相当于电脑的硬盘,断电后数据不易丢失&#x2F;ram是随即访问存储器断电后数据不保存会丢失&#x2F;内存包括ROM RAM&#x2F;高速缓存的作用是协调设备之间的存取速度不一致17.计算机的三总线结构:总线是一组导线、是公共通路,微型计算机中各个组成部件之间的信息传输都是通过它们来实现的&#x2F;地址总线(AB)是单向总线,用以传送CPU向外设或存储器发出的地址信息。&#x2F;数据总线(DB)是双向总线,用以CPU与内存或接口之间传输数据信息。&#x2F;控制总线(CB)是双向总线,有的作为输出,有的作为输入,用以CPU与内存或I&#x2F;O接口之间传送控制信息。分别传送地址信号、数据信号和控制信号。18.软件系统:系统软件(操作系统软件(Windows系列、Linux系列、macOS、DOS、OS&#x2F;2等)、计算机语言(机器语言、汇编语言、高级语言:basic,pascal,c,c++,viscal basic))应用软件(Adobe全家桶、office、3dmax、flash等)19.面向对象语言是一类以对象作为基本程序结构单位的程序设计语言(纯面向对象语言,如Smalltalk、EIFFEL等;混合型面向对象语言,即在过程式语言及其它语言中加入类、继承等成分,如C++、Objective-C等;Visual B\\C,Java)20.计算机指令系统:计算机能直接识别和执行的命令称为指令。指令本身是二进制代码。是要计算机执行某种操作的命令。用机器指令编写的程序称之为机器语言程序。一条指令通常由操作码和地址码两部分组成。21.计算机的数字系统(n进制):逢n进位(考试常见进制:二进制、八进制、十进制、十六进制)具体的转换方法请参考这里22.在计算机中带符号数的表示法:原码(二进制,首位为符号位,1为负,0为正)反码(正数原反相同,负数符号位保留,其余取反(即0变1,1变0)[+0]反表示为00…0,[-0]反表示为11…1)补码(非负数数原补相同,负数两头1不变,中间取反)BCD码(8421码)(关于BCD码)23.信息存储单位:位(bit,缩写为b):度量数据的最小单位,表示一位二进制信息字节(Byte,缩写为B):一个字节由八位二进制数字组成(l Byte&#x3D;8bit)字节是信息存储中最常用的基本单位常见转换:KB 1K&#x3D;1024BMB 1M&#x3D;1024KGB 1G&#x3D;1024MTB 1T&#x3D;1024G24.机器字:字是位的组合,并作为一个独立的信息单位处理。字又称为计算机字,它取决于机器的类型、字长以及使用者的要求。常用的固定字长有8位、16位、32位等。25.计算机网络体系结构:国际标准化组织(ISO)提出的开放系统互联参考模型(OSI)(上海自来水来自海上)图示:26.TCP&#x2F;IP:Transmission Control Protocol&#x2F;Internet Protocol的简写,中文译名为传输控制协议&#x2F;因特网互联协议,又叫网络通讯协议超文本传输协议(HTTP),文件传输协议(FTP),Telnet和简单邮件传输协议(SMTP:发送收电子邮件,pop3:接收电子邮件)27.Internet 网络地址(IP地址):百度百科IP地址共32位IP地址编址方式 未完待续(今回はここまで)心得从初级班转过来,原因是C++的基本语法已经掌握转过来不仅是提升自我,也是对自己的一种挑战虽然刚加进来时,所知道的算法寥寥无几但,这几天的学习,补上了这一窟窿每一次用算法解决了问题,虽感疲惫,但成就感满满不过,结营的测试,也让我意识到了问题基础知识的不牢固,对算法理解的不透彻,以及数论现在也在改进的路上(背基础知识,上洛谷刷题、做以往真题等等)(说实话,背基础真的好痛苦)那么,2021NOIP加油!","tags":""},{"title":"哔哩漫游解析服务器","url":"/2021/07/15/哔哩漫游解析服务器/","text":"哔哩漫游解析服务器地址bili.24kblog.top 配置方法哔哩漫游使用方法 捐赠微信 支付宝 送一杯咖啡提提神~","tags":"哔哩哔哩"},{"title":"有点紧张","url":"/2021/06/19/有点紧张/","text":"明天就要进行海中的自主招生考试了有点紧张","tags":"考试"},{"title":"每日播报（2021-06-14）","url":"/2021/06/14/每日播报（2021-06-14）/","text":"距离中考仅剩 11 天 海口市天气 多云 温度:31°C(26~33°C) 风级:西南风 4-5级 空气质量:20 优 节日 今天是端午节！🐲 父亲节: 6天 夏至日: 7天 建党节、香港回归日: 17天","tags":"每日播报"},{"title":"每日播报（2021.06.13）","url":"/2021/06/13/每日播报（2021-06-13）/","text":"距离中考仅剩 12 天 海口市天气 雷阵雨转多云 温度:30°C(26~32°C) 风级:微风&lt;3级 空气质量:18 优 节日 端午节: 1天 父亲节: 7天 夏至日: 8天 建党节、香港回归日: 18天","tags":"每日播报"},{"title":"我的第一篇文章","url":"/2021/06/12/我的第一篇文章/","text":"我是24k,你好啊距离中考仅剩 13 天 海口市天气 雷阵雨 温度:28°C(27~31°C) 风级:东南风3~4级 空气质量:14 优 节日 端午节: 2天 父亲节: 8天 夏至日: 9天 建党节、香港回归日: 19天 以上2021.06.12","tags":"初见"},{"title":"关于博客","url":"/about.html","text":"关于我 自我介绍 名 24k 英文名 Jobs 是个编程菜鸟,中学生,17岁(24岁)。 🇨🇳来自中国 ⌨️学习C++、C#、Python中 ⌨️备战高考中 ⌨️日本語を勉強します。 建这个博客的原因 觉得hexo好玩,就建了。 接下来想用博客做什么 发表各种杂七杂八的文章,包括但不限于:计算机技术、语言学习、日常唠嗑、奇怪的东西。 建站日期:2021.06.12","tags":""},{"title":"文章归档","url":"/archives.html","text":"","tags":""},{"title":"搜索","url":"/search/index.html","text":"","tags":""},{"title":"我的朋友","url":"/PY.html","text":"欢迎互加友链空空如也~~(我是孤儿) 添加可以在评论区留言，请使用以下格式方便懒狗复制： - [![网站名](头像链接)](网站地址 &quot;网站名&quot;)","tags":""}]}