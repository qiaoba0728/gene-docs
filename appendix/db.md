# 5.1 数据库介绍

## GO
<font face="微软雅黑" >&emsp;&emsp;基因本体论联合会建立的数据库 (Gene Ontology，[http://geneontology.org/](http://geneontology.org/))。GO的产生主要是为了解决同一基因在不同数据库定义的混乱性以及不同物种的同一基因在功能定义上的混乱性。它是一个国际标准化的基因功能分类体系，提供了一套动态更新的标准词汇表(Controlled Vocabulary)来全面描述生物体中基因和基因产物的属性。GO 涵盖三个方面，分别描述基因的分子功能(Molecular Function)、细胞的组件作用(Cellular Component)、参与的生物学过程(Biological Process)。基因或蛋白质可以通过 ID 对应或者序列注释的方法找到与之对应的 GO 编号，而 GO 编号可用于对应到 GO Term，即功能类别或者细胞定位。</font><br />

<font face="微软雅黑" >&emsp;&emsp;GO 的基本单元是 Term，每个 Term 有一个唯一的标示符(由 “GO:” 加上7个数字组成，例如 GO:0072669)；每类 Ontology 的 Term 通过它们之间的联系( is_a, part_of, regulate)构成一个有向无环的拓扑结构。GOSlim 是缩减版的 GO 术语，它提供了 GO 注释的概述性结果。</font><br />


## KEGG

<font face="微软雅黑" >&emsp;&emsp;京都基因与基因组百科全书（Kyoto Encyclopedia of Genes and Genomes，[http://www.kegg.jp/](http://www.kegg.jp/)）是一个整合了基因组、化学和系统功能信息的数据库。把从已经完整测序的基因组中得到的基因目录与更高级别的细胞、物种和生态系统水平的系统功能关联起来是KEGG数据库的特色之一。KEGG 注释主要包括：
- KO （KEGG Ortholog）注释，即将分子网络的相关信息进行跨物种注释； 
- KEGG Pathway 注释，即代谢通路注释，获得物种内分子间相互作用和反应的网络。
</font><br />

## UniProt

<font face="微软雅黑" >&emsp;&emsp;UniProt 知识库（UniProt Knowledgebase，[http://www.uniprot.org/help/uniprotkb](http://www.uniprot.org/help/uniprotkb)）的子数据库，是经过有经验的分子生物学家和蛋白质化学家仔细核实的高质量的、手工注释的、非冗余的蛋白数据集。SwissProt数据库的每个条目都有详细的注释，包括结构域、功能位点、跨膜区域、二硫键位置、翻译后修饰、突变体等。该数据库中还包括了与核酸序列数据库EMBL/GenBank/DDBJ、蛋白质结构数据库PDB以及Prosite、PRINTTS等十多个二次数据库的交叉引用代码。</font><br />

## EC
<font face="微软雅黑" >&emsp;&emsp;国际生物化学会酶学委员会（Enzyme Commission，[http://enzyme.expasy.org/](http://enzyme.expasy.org/)），根据酶所催化的反应类型和机理，把酶分成6大类：氧化还原酶、转移酶、水解酶、裂合酶、异构酶及合成酶。</font><br />



## eggNOG

<font face="微软雅黑" >&emsp;&emsp;真核生物直系同源蛋白质聚类（Evolutionary Genealogy of Genes: Non-supervised Orthologous Groups，[http://eggnog.embl.de/version_3.0/](http://eggnog.embl.de/version_3.0/)），具体信息请参考([http://www.ncbi.nlm.nih.gov/COG/ ](http://www.ncbi.nlm.nih.gov/COG/))。我们将列出所有基因的 eggNOG ID ，然后把这些 eggNOG ID 归入适当的 eggNOG 分类单元(Category)，由此对基因组的所有基因功能做分类统计，从宏观上认识该物种的基因功能分布特征。</font><br />
<font face="微软雅黑" >&emsp;&emsp;构成每个 eggNOG 的蛋白都是被假定为来自于一个祖先蛋白，并且因此或者是直系同源(Orthologs) 或者是旁系同源(Paralogs)。Orthologs 是指来自于不同物种的由垂直家系(物种形成)进化而来的蛋白，并且典型的保留与原始蛋白有相同的功能。Paralogs 是那些在一定物种中的来源于基因复制的蛋白，可能会进化出新的与原来有关的功能。</font><br />