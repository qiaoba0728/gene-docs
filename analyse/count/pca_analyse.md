# 3.1.4 PCA分析

<font face="微软雅黑" >&emsp;&emsp;PCA 主成分分析（Principal Components Analysis），通过线性变换，将高维数据降低至二维或三维，同时保持各方差贡献最大的特征，即降低数据复杂度。当有多个样品时，我们使用R语言的 DESeq软件包，根据表达量对各样品进行 PCA 主成分分析。PCA 分析可以把相似的样本聚到一起，距离越近表明样本间相似性越高。结果见图6。</font><br />


<center><img src='../asset/pca_count.png'></center>
<center>图6 PCA分析</center>

{{result}}