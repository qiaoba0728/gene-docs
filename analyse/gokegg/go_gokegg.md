# 3.3.1 GO富集分析


<font face="微软雅黑" >&emsp;&emsp;使用topGO进行GO富集分析，分析时利用GO term 注释的差异基因对每个term 的基因列表和基因数目进行计算，然后通过超几何分布方法计算P-value（显著富集的标准为P-value < 0.05），找出与整个基因组背景相比，差异基因显著富集的GO term ，从而确定差异基因行使的主要生物学功能</font><br />




<font face="微软雅黑" >&emsp;&emsp;对差异表达的基因的GO富集分析结果，按照分子功能MF、生物过程BP 和细胞组分CC 进行GO 分类，挑选每个GO 分类中挑选p-value最小即富集最显著的前10个GO term条目进行展示，结果见图14。</font><br />


{{details1}}

<center>图14 GO富集分析柱状图</center>

{{result}}

<!-- <font face="微软雅黑" >&emsp;&emsp;根据GO富集结果，通过Rich factor、FDR值和富集到此GO Term 上的基因个数来衡量富集的程度。其中，Rich factor 指该GO Term 中富集到的差异基因个数与注释到的差异基因个数的比值。Rich factor越大，表示富集的程度越大。FDR一般取值范围为0-1，越接近于零，表示富集越显著。挑选FDR值最小的即富集最显著的前20个GO Term 条目进行展示，结果见图16。</font><br />

{{details2}}
<center>图21 GO富集分析气泡图</center> -->
