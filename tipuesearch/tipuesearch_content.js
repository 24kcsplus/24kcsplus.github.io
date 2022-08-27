var tipuesearch = {"pages":[{"title":"刷题记录","url":"/2021/10/07/刷题记录/","text":"刷题记录1.P1179 [NOIP2010 普及组] 数字统计解题思路:声明一个整型变量,作为计数器,再计算两个值之间2的出现次数 核心代码: while(g!=0)&#123; if(g%10==2)ans++; g/=10; &#125; 我的代码:#include &lt;bits/stdc++.h&gt; using namespace std; int main()&#123; int l,r,ans=0; cin&gt;&gt;l&gt;&gt;r; for(int i=l;i&lt;=r;i++)&#123; int g=i; while(g!=0)&#123; if(g%10==2)ans++; g/=10; &#125; &#125; cout&lt;&lt;ans&lt;&lt;endl; return 0; &#125; 2.P1307 [NOIP2011 普及组] 数字反转解题思路:声明待输入数和输出数,输出数扩充一位给输入数最后一位,输入数再舍去最后一位 核心代码: for(na;na!=0;na/=10) nb=nb*10+na%10; 我的代码#include &lt;iostream&gt; using namespace std; int na,nb=0; int main()&#123; cin&gt;&gt;na; for(na;na!=0;na/=10) nb=nb*10+na%10; cout&lt;&lt;nb; &#125; 3.P1075 [NOIP2012 普及组] 质因数分解解题思路:从小到大轮流除,找到最小因数,质因数&#x2F;最小因数&#x3D;最大因数 核心代码: for(int i=2;i&lt;=n;++i)&#123; if(n%i==0)&#123; cout&lt;&lt;n/i; return 0; &#125; &#125; 我的代码:#include &lt;cstdio&gt; #include &lt;iostream&gt; using namespace std; int main()&#123; int n; cin&gt;&gt;n; for(int i=2;i&lt;=n;++i)&#123; if(n%i==0)&#123; cout&lt;&lt;n/i; return 0; &#125; &#125; &#125; 4.P1980 [NOIP2013 普及组] 计数问题解题思路:每个数都进行判断,使用计数器计数 核心代码: for(i=1;i&lt;=n;i++)&#123; temp=i; while(temp!=0)&#123; t=temp%10; temp/=10; if(t==x) c++; &#125; 我的代码:#include &lt;iostream&gt; using namespace std; int n,x,temp,i,t,c; int main()&#123; cin&gt;&gt;n&gt;&gt;x; for(i=1;i&lt;=n;i++)&#123; temp=i; while(temp!=0)&#123; t=temp%10; temp/=10; if(t==x) c++; &#125; &#125; cout&lt;&lt;c&lt;&lt;endl; return 0; &#125; 5.P2141 [NOIP2014 普及组] 珠心算测验解题思路:暴力查找 核心代码: for(i=1;i&lt;=n;i++)&#123; cin&gt;&gt;a[i]; tf[a[i]]++; &#125; for (i=1;i&lt;=n;i++)&#123; for(g=1+1;g&lt;=n;g++)&#123; ti[a[i]+a[g]]++; mn=max(mn,a[i]+a[g]); &#125; &#125; for(i=1;i&lt;=mn;i++)&#123; if(ti[i]&gt;0&amp;&amp;tf[i]) ans++; &#125; 我的代码:#include &lt;iostream&gt; #include &lt;cstdio&gt; using namespace std; const int M=20005; int ti[M],tf[M],n,a[205],ans,mn,i,g; int main()&#123; cin&gt;&gt;n; for(i=1;i&lt;=n;i++)&#123; cin&gt;&gt;a[i]; tf[a[i]]++; &#125; for (i=1;i&lt;=n;i++)&#123; for(g=1+1;g&lt;=n;g++)&#123; ti[a[i]+a[g]]++; mn=max(mn,a[i]+a[g]); &#125; &#125; for(i=1;i&lt;=mn;i++)&#123; if(ti[i]&gt;0&amp;&amp;tf[i]) ans++; &#125; cout&lt;&lt;ans; &#125; 6.P2669 [NOIP2015 普及组] 金币解题思路:自加,后减去超出部分 核心代码: for(i=1;k-i&gt;0;k-=i++)&#123; coin+=i*i; &#125; cout&lt;&lt;coin+k*i; 我的代码:#include &lt;cstdio&gt; #include &lt;iostream&gt; using namespace std; long long int k,i,coin; int main()&#123; cin&gt;&gt;k; for(i=1;k-i&gt;0;k-=i++)&#123; coin+=i*i; &#125; cout&lt;&lt;coin+k*i; &#125;","tags":"csp"},{"title":"海中信息学夏令营学习笔记&心得","url":"/2021/08/13/海中信息学夏令营学习笔记/","text":"海中信息学夏令营学习笔记&amp;心得第一天递归算法百度上的定义是在计算机科学中是指一种通过重复将问题分解为同类的子问题而解决问题的方法。有点难懂,但结合一些例子就容易理解了,比如:1.如何给一堆数字排序?答:分成两半,先排左半边再排右半边,最后合并就行了,至于怎么排左边和右边,请重新阅读这句话。2.简单来说,递归就是函数自己调用自己本身,以解决问题。 典型问题:汉诺塔问题 基础知识 这些知识主要靠记背,加油吧! 1、计算机的基本常识●计算机和信息社会(信息社会的主要特征、计算机的主要特征、数字通信网络的主要特征、数字化)●信息输入输出基本原理(信息交换环境、文字图形多媒体信息的输入输出方式)信息的表示与处理(信息编码、微处理部件MPU、内存储结构、指令,程序,和存储程序原理、程序的三种基本控制结构)●信息的存储、组织与管理(存储介质、存储器结构、文件管理、数据库管理)●信息系统组成及互连网的基本知识(计算机构成原理、槽和端口的部件间可扩展互连方式、层次式的互连结构、互联网络、TCP&#x2F;IP协议、HTTP协议、WEB应用的主要方式和特点)●人机交互界面的基本概念(窗口系统、人和计算机交流信息的途径(文本及交互操作))●信息技术的新发展、新特点、新应用等。 2、计算机的基本操作●WINDOWS和LINUX的基本操作知识●联网的基本使用常识(网上浏览、搜索和查询等)●常用的工具软件使用(文字编辑、电子邮件收发等) 3、程序设计的基本知识(1)、数据结构●程序语言中基本数据类型(字符、整数、长整数、浮点)●浮点运算中的精度和数值比较●一维数组(串)与线性表●记录类型(PASCAL)&#x2F;结构类型(C)(2)、程序设计●结构化程序设计的基本概念阅读理解程序的基本能力●具有将简单问题抽象成适合计算机解决的模型的基本能力●具有针对模型设计简单算法的基本能力●程序流程描述(自然语言&#x2F;伪码&#x2F;NS图&#x2F;其他)●程序设计语言(PASCAL&#x2F;C &#x2F; C++,)(3)、基本算法处理●初等算法(计数、统计、数学运算等)●排序算法(冒泡法、插入排序、合并排序、快速排序)●查找(顺序查找、二分法)●回溯算法 上面这些是初赛的考察范围,刚见到的时候,其实我是拒绝的。 这节课讲了计算机发展及应用、保护知识产权、计算机病毒、计算机系统的组成、计算机指令系统、计算机的数字系统、在计算机中带符号数的表示法、信息存储单位及计算机网络知识。(讲的好多,总结起来都有点害怕) 知识点:1.第一台电子计算机的诞生: ENIAC(1946,以约翰·莫克利、普雷斯伯·埃克特两人名字命名)2.第一台具有存储程序功能的计算机:EDVAC(冯·诺依曼(美籍匈牙利人),由运算器、控制器、存储器、输人设备和输出设备这五部分组成)3.EDVAC的进步:采用二进制、提出了“存储程序”4.图灵(英国人),发明了图灵机,提出图灵试验5.图灵奖(1966,美国计算机协会,纪念图灵为目的之一)(计算机界的诺贝尔奖,啥时候我也能拿)获得此奖的华人:姚期智(目前在清华,有清华姚班)6.世界上第一位软件工程师:Ada Lovelace(爱达)(英国诗人拜伦的女儿)7.中国第一个程序员:董铁宝(王选的老师,死于文革)8.计算机发展阶段:电子管(1946-1958)、晶体管(1958-1964)、中小规模集成电路(1964-1975)、大规模&#x2F;超大规模集成电路(1975-至今)9.计算机的运用:科学计算(数值计算)、数据处理(信息处理)、人工智能、自动控制、计算机辅助设计和制造(CAI计算机辅助教学、CAM计算机辅助制造、CAT计算机辅助测试、CAD计算机辅助设计、CAE计算机辅助教育、CIMS计算机集成制造系统)10.知识产权保护:法律文件《计算机软件保护条例》(此法用于保护软件的著作权)11.计算机病毒:功能比较特殊的计算机程序(特点:能够将复制在其他程序中;不以独立文件形式存在,仅依附于其他程序上)(是程序,不能感染人!)(谁都知道吧)12.硬件系统的组成:运算器、控制器、存储器、输入设备、输出设备13.运算器+控制器&#x3D;CPU(中央处理器)14.存储器:外存储器(硬盘、光盘、软盘、优盘等)、内存储器(ROM只读存储器、RAM随机存取存储器(平常说的运行内存))、高速缓存器:cache15.速度:高速缓存器&gt;内存&gt;外存16.rom是只读内存,相当于电脑的硬盘,断电后数据不易丢失&#x2F;ram是随即访问存储器断电后数据不保存会丢失&#x2F;内存包括ROM RAM&#x2F;高速缓存的作用是协调设备之间的存取速度不一致17.计算机的三总线结构:总线是一组导线、是公共通路,微型计算机中各个组成部件之间的信息传输都是通过它们来实现的&#x2F;地址总线(AB)是单向总线,用以传送CPU向外设或存储器发出的地址信息。&#x2F;数据总线(DB)是双向总线,用以CPU与内存或接口之间传输数据信息。&#x2F;控制总线(CB)是双向总线,有的作为输出,有的作为输入,用以CPU与内存或I&#x2F;O接口之间传送控制信息。分别传送地址信号、数据信号和控制信号。18.软件系统:系统软件(操作系统软件(Windows系列、Linux系列、macOS、DOS、OS&#x2F;2等)、计算机语言(机器语言、汇编语言、高级语言:basic,pascal,c,c++,viscal basic))应用软件(Adobe全家桶、office、3dmax、flash等)19.面向对象语言是一类以对象作为基本程序结构单位的程序设计语言(纯面向对象语言,如Smalltalk、EIFFEL等;混合型面向对象语言,即在过程式语言及其它语言中加入类、继承等成分,如C++、Objective-C等;Visual B\\C,Java)20.计算机指令系统:计算机能直接识别和执行的命令称为指令。指令本身是二进制代码。是要计算机执行某种操作的命令。用机器指令编写的程序称之为机器语言程序。一条指令通常由操作码和地址码两部分组成。21.计算机的数字系统(n进制):逢n进位(考试常见进制:二进制、八进制、十进制、十六进制)具体的转换方法请参考这里22.在计算机中带符号数的表示法:原码(二进制,首位为符号位,1为负,0为正)反码(正数原反相同,负数符号位保留,其余取反(即0变1,1变0)[+0]反表示为00…0,[-0]反表示为11…1)补码(非负数数原补相同,负数两头1不变,中间取反)BCD码(8421码)(关于BCD码)23.信息存储单位:位(bit,缩写为b):度量数据的最小单位,表示一位二进制信息字节(Byte,缩写为B):一个字节由八位二进制数字组成(l Byte&#x3D;8bit)字节是信息存储中最常用的基本单位常见转换:KB 1K&#x3D;1024BMB 1M&#x3D;1024KGB 1G&#x3D;1024MTB 1T&#x3D;1024G24.机器字:字是位的组合,并作为一个独立的信息单位处理。字又称为计算机字,它取决于机器的类型、字长以及使用者的要求。常用的固定字长有8位、16位、32位等。25.计算机网络体系结构:国际标准化组织(ISO)提出的开放系统互联参考模型(OSI)(上海自来水来自海上)图示:26.TCP&#x2F;IP:Transmission Control Protocol&#x2F;Internet Protocol的简写,中文译名为传输控制协议&#x2F;因特网互联协议,又叫网络通讯协议超文本传输协议(HTTP),文件传输协议(FTP),Telnet和简单邮件传输协议(SMTP:发送收电子邮件,pop3:接收电子邮件)27.Internet 网络地址(IP地址):百度百科IP地址共32位IP地址编址方式 未完待续(今回はここまで)心得从初级班转过来,原因是C++的基本语法已经掌握转过来不仅是提升自我,也是对自己的一种挑战虽然刚加进来时,所知道的算法寥寥无几但,这几天的学习,补上了这一窟窿每一次用算法解决了问题,虽感疲惫,但成就感满满不过,结营的测试,也让我意识到了问题基础知识的不牢固,对算法理解的不透彻,以及数论现在也在改进的路上(背基础知识,上洛谷刷题、做以往真题等等)(说实话,背基础真的好痛苦)那么,2021NOIP加油!","tags":""},{"title":"哔哩漫游解析服务器","url":"/2021/07/15/哔哩漫游解析服务器/","text":"哔哩漫游解析服务器地址hk.biliunlock.xyz 配置方法哔哩漫游使用方法 捐赠微信 支付宝 送一杯咖啡提提神~(大陆、台湾、泰区准备中)","tags":"哔哩哔哩"},{"title":"有点紧张","url":"/2021/06/19/有点紧张/","text":"明天就要进行海中的自主招生考试了有点紧张","tags":"考试"},{"title":"每日播报（2021-06-14）","url":"/2021/06/14/每日播报（2021-06-14）/","text":"距离中考仅剩 11 天 海口市天气 多云 温度:31°C(26~33°C) 风级:西南风 4-5级 空气质量:20 优 节日 今天是端午节！🐲 父亲节: 6天 夏至日: 7天 建党节、香港回归日: 17天","tags":"每日播报"},{"title":"每日播报（2021.06.13）","url":"/2021/06/13/每日播报（2021-06-13）/","text":"距离中考仅剩 12 天 海口市天气 雷阵雨转多云 温度:30°C(26~32°C) 风级:微风&lt;3级 空气质量:18 优 节日 端午节: 1天 父亲节: 7天 夏至日: 8天 建党节、香港回归日: 18天","tags":"每日播报"},{"title":"我的第一篇文章","url":"/2021/06/12/我的第一篇文章/","text":"我是24k,你好啊距离中考仅剩 13 天 海口市天气 雷阵雨 温度:28°C(27~31°C) 风级:东南风3~4级 空气质量:14 优 节日 端午节: 2天 父亲节: 8天 夏至日: 9天 建党节、香港回归日: 19天 以上2021.06.12","tags":"初见"},{"title":"关于博客","url":"/about.html","text":"关于我 自我介绍名 24k 英文名 Jobs是个编程菜鸟,中学生,16岁(24岁)。 🇨🇳来自中国 ⌨️学习C++、C#、Nodejs、Python中 ⌨️备战高考中 ⌨️日本語を勉強します。 建这个博客的原因觉得hexo好玩,就建了。 接下来想用博客做什么发表各种杂七杂八的文章,包括但不限于:计算机技术、语言学习、日常唠嗑、奇怪的东西。 建站日期:2021.06.12","tags":""},{"title":"文章归档","url":"/archives.html","text":"","tags":""},{"title":"搜索","url":"/search/index.html","text":"","tags":""},{"title":"links","url":"/PY.html","text":"欢迎互加友链空空如也~~(我是孤儿)","tags":""}]}