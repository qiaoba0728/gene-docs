# 3.2.2 聚类分析

<font face="微软雅黑" >&emsp;&emsp;聚类分析用于判断差异表达基因在不同实验条件下的表达模式；在样品间表达量相关性高的基因被归为一类，通常这些基因在某些生物学过程，或者某个代谢、信号通路中存在实际的联系。因此通过表达量聚类我们可以发现基因间未知的生物学联系。</font><br />

<font face="微软雅黑" >&emsp;&emsp;我们使用R语言 Pheatmap 软件包对所有比较组的差异基因的并集和样品进行双向聚类分析，根据同一基因在不同样品中的表达水平和同一样品中不同基因的表达模式进行聚类，采用 Euclidean 方法计算距离，层次聚类最长距离法(Complete Linkage)进行聚类。结果见图11。</font><br />




<center><img src='../asset/cluster.png'></center>


<center>图11 差异表达基因聚类</center>


{{result}}