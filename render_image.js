let fs = require('fs');
let path = require('path');

let outputPrefix = "/template"

//all action
function copyCleanImageAndRender() {
    let filePath = "/data/output/clean_result"
    console.log("copy clean images")
    let qualityNames = [];
    let contentNames = [];
    let readsNames = [];
    console.log(filePath)
    let files = fs.readdirSync(filePath)
    console.log(files)
    files.forEach(filename => {
        console.log(filePath,filename)
        let cleanPath = path.join(filePath, filename);
        let stat = fs.statSync(cleanPath);
        if (stat.isDirectory() && filename.endsWith(".clean_fastqc")) {
            fileCleanPath = path.join(cleanPath,"Images")
            let resultFiles = fs.readdirSync(fileCleanPath);
            resultFiles.forEach(resultFileName => {
                let prefixName = filename.replace(".clean_fastqc", "");
                let filedir = path.join(fileCleanPath, resultFileName);
                if (resultFileName == "per_base_quality.png") {
                    let name = prefixName + "_"+resultFileName;
                    qualityNames.push(prefixName);
                    // base asset
                    fs.writeFileSync(outputPrefix + "/base/asset/" + name, fs.readFileSync(filedir));
                }
                if (resultFileName == "per_base_sequence_content.png") {
                    let name = prefixName + "_"+resultFileName;
                    contentNames.push(prefixName);
                    fs.writeFileSync(outputPrefix + "/base/asset/" + name, fs.readFileSync(filedir));
                }
                if (resultFileName == "per_sequence_quality.png") {
                    let name = prefixName + "_"+resultFileName;
                    readsNames.push(prefixName);
                    fs.writeFileSync(outputPrefix + "/base/asset/" + name, fs.readFileSync(filedir));
                }
            })
        }
    });

    console.log(qualityNames)
    console.log(contentNames)
    console.log(readsNames)
    renderImageDetail(qualityNames,outputPrefix + "/base/origin/quality_origin.md","_per_base_quality.png","{{quality}}")
    renderImageDetail(contentNames,outputPrefix + "/base/origin/content_origin.md","_per_base_sequence_content.png","{{content}}")
    renderImageDetail(readsNames,outputPrefix + "/base/origin/reads_origin.md","_per_sequence_quality.png","{{reads}}")

    filePath = "/data/output/report_result"
    files = fs.readdirSync(filePath);
    names = [];
    files.forEach(filename => {
        let filedir = path.join(filePath, filename);
        if (filename.endsWith("_read_distribution_plot.png")) {
            let name = filename.replace("_read_distribution_plot.png", "");
            names.push(name);
            // 2.2 比对区域分布统计
            fs.writeFileSync(outputPrefix + "/base/asset/" + filename, fs.readFileSync(filedir));
        }
    })
    renderImageDetail(names,outputPrefix + "/base/blast/area_blast.md","_read_distribution_plot.png","{{tables}}")

    names = [];
    files.forEach(filename => {
        let filedir = path.join(filePath, filename);
        if (filename.endsWith(".geneBodyCoverage.curves.png")) {
            let name = filename.replace(".geneBodyCoverage.curves.png", "");
            if (name != "all") {
                names.push(name);
            }
            // 2.2 比对区域分布统计
            fs.writeFileSync(outputPrefix + "/base/asset/" + filename, fs.readFileSync(filedir));
        }
    })
    try{
        fs.writeFileSync(outputPrefix + "/base/asset/all.geneBodyCoverage.curves.png" , fs.readFileSync(filePath + "/all.geneBodyCoverage.curves.png"));
    } catch (err) {
        console.error(err)
    }
    renderImageDetail(names,outputPrefix + "/base/blast/cover_blast.md",".geneBodyCoverage.curves.png","{{details}}")
    names = [];


    //复制图片文件
    copyAnalyseImage(filePath);

}

function copyAnalyseImage(filePath) {
    console.log("copy analyse images")
    let freqNames = [];
    let staturaNames = [];
    let files = fs.readdirSync(filePath);
    files.forEach(filename => {
        let filedir = path.join(filePath, filename);
        if (filename.endsWith("_freq_count.png")) {
            console.log(filedir,filename)
            let name = filename.replace("_freq_count.png", "");
            freqNames.push(name);
            // 2.2 比对区域分布统计
            fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
            // 2.3 基因覆盖均一度
            //fs.writeFileSync(outputPrefix + "/base/assert/" + name + ".geneBodyCoverage.curves.png", fs.readFileSync(filePath + "/" + name + ".geneBodyCoverage.curves.png"));
        }
        if (filename.endsWith(".saturation.png")) {
            console.log(filedir,filename)
            let name = filename.replace(".saturation.png", "");
            staturaNames.push(name);
            // 2.2 比对区域分布统计
            fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
            // 2.3 基因覆盖均一度
            //fs.writeFileSync(outputPrefix + "/base/assert/" + name + ".geneBodyCoverage.curves.png", fs.readFileSync(filePath + "/" + name + ".geneBodyCoverage.curves.png"));
        }
    })
    renderImageDetail(freqNames,outputPrefix + "/analyse/count/count_analyse.md","_freq_count.png","{{details}}")
    renderImageDetail(freqNames,outputPrefix + "/analyse/count/README.md","_freq_count.png","{{details}}")
    renderImageDetail(staturaNames,outputPrefix + "/analyse/count/saturate_analyse.md",".saturation.png","{{details}}")


    try{
        fs.writeFileSync(outputPrefix + "/analyse/asset/veen.png", fs.readFileSync(filePath + "/veen.png"));
    } catch (err) {
        console.error(err)
    }
    try{
        fs.writeFileSync(outputPrefix + "/analyse/asset/fpkm.png", fs.readFileSync(filePath + "/fpkm.png"));
        fs.writeFileSync(outputPrefix + "/analyse/asset/fpkm_all.png", fs.readFileSync(filePath + "/fpkm_all.png"));
        fs.writeFileSync(outputPrefix + "/analyse/asset/fpkm_violin.png", fs.readFileSync(filePath + "/fpkm_violin.png"));
        fs.writeFileSync(outputPrefix + "/analyse/asset/pca_count.png", fs.readFileSync(filePath + "/pca_count.png"));
        fs.writeFileSync(outputPrefix + "/analyse/asset/heatmap_count.png", fs.readFileSync(filePath + "/heatmap_count.png"));
        fs.writeFileSync(outputPrefix + "/analyse/asset/cluster.png", fs.readFileSync(filePath + "/cluster.png"));
        fs.writeFileSync(outputPrefix + "/analyse/asset/build_stat.png", fs.readFileSync(filePath + "/build_stat.png"));
        fs.writeFileSync(outputPrefix + "/analyse/asset/mfuzz.png", fs.readFileSync(filePath + "/mfuzz.png"));
    } catch (err) {
        console.error(err)
    }

    //renderImageDetail(names)
    filePath = "/data/output/diff"
    copyDiffImage(filePath);
    copyGOKEGGDiff(filePath);
}
function copyDiffImage(filePath) {
    let names = [];
    let voNames = []
    let maNames = [];
    let pheatNames = [];
    let pheatNamesEx = [];
    let files = fs.readdirSync(filePath);
    files.forEach(filename => {
        let filedir = path.join(filePath, filename);
        if (filename == "all_down_up.png") {
            fs.writeFileSync(outputPrefix + "/analyse/asset/diff.png", fs.readFileSync(filedir));
        }
        if (filename.endsWith("_down_up.png")) {
            console.log(filedir,filename)
            let name = filename.replace("_down_up.png", "");
            names.push(name);
            fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
        }
        if (filename.endsWith("_volcano.png")) {
            console.log(filedir,filename)
            let name = filename.replace("_volcano.png", "");
            voNames.push(name);
            fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
        }
        if (filename.endsWith("_MAplot.png")) {
            console.log(filedir,filename)
            let name = filename.replace("_MAplot.png", "");
            maNames.push(name);
            fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
        }
        if (filename.endsWith("_pheatmap.png")) {
            console.log(filedir,filename)
            let name = filename.replace("_pheatmap.png", "");
            pheatNames.push(name)
            fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
        }
    })
    renderImageDetail(names,outputPrefix + "/analyse/diff/check_diff.md","_down_up.png","{{count_detail}}")
    renderImageDetail(voNames,outputPrefix + "/analyse/diff/check_diff.md","_volcano.png","{{volcanos_detail}}")
    renderImageDetail(maNames,outputPrefix + "/analyse/diff/check_diff.md","_MAplot.png","{{maplots_detail}}")

    renderImageDetail(names,outputPrefix + "/analyse/diff/README.md","_down_up.png","{{count_detail}}")
    renderImageDetail(voNames,outputPrefix + "/analyse/diff/README.md","_volcano.png","{{volcanos_detail}}")
    renderImageDetail(maNames,outputPrefix + "/analyse/diff/README.md","_MAplot.png","{{maplots_detail}}")
    //renderImageDetail(pheatNames,outputPrefix + "/analyse/diff/check_diff.md","_pheatmap.png","{{pheatmap_detail}}")

    // 聚类分析的图
    // 韦恩图
}
function renderImageDetail(names,file,lastIndex,renderTemplate) {
    console.log("render details:", names,lastIndex,renderTemplate)
    try {
        //let file = outputPrefix + "/base/blast/area_blast.md"
        let data = fs.readFileSync(file, 'utf8');
        let detail = "";
        // for (let name of names) {
        //     detail += `<details open><summary>${name}</summary><center><img src='../asset/${name}${lastIndex}'></center></details>\n`
        // }
        names.forEach(function(v,i,a){
            if (i == 0){
                detail += `<details open><summary>${v}</summary><center><img src='../asset/${v}${lastIndex}'></center></details>\n`
            }else {
                detail += `<details><summary>${v}</summary><center><img src='../asset/${v}${lastIndex}'></center></details>\n`
            }
        })
        data = data.replace(renderTemplate, detail)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
}

function copyGOKEGGDiff(filePath) {
    console.log("copy GO KEGG images")
    let files = fs.readdirSync(filePath);
    let goNamesq = []
    let goNamesd = []
    let keggNamesd = []
    let keggNamesq = []
    files.forEach(filename => {
        let filedir = path.join(filePath, filename);
        if (filename.endsWith("_go_enrich_q_0.05.png") && !filename.startsWith("all_")){
            let name = filename.replace("_go_enrich_q_0.05.png", "");
            goNamesq.push(name)
            fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
        }
        if (filename.endsWith("_go_enrich.dotplot.png") && !filename.startsWith("all_")) {
            let name = filename.replace("_go_enrich.dotplot.png", "");
            goNamesd.push(name)
            fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
        } 
        if (filename.endsWith("_KEGG_enrichment.dotplot-0.05.png") && !filename.startsWith("all_")) {
            let name = filename.replace("_KEGG_enrichment.dotplot-0.05.png", "");
            keggNamesq.push(name)
            fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
        } 
        if (filename.endsWith("_KEGG_enrichment.dotplot-0.05.png") && !filename.startsWith("all_")) {
            let name = filename.replace("_KEGG_enrichment.dotplot-0.05.png", "");
            keggNamesq.push(name)
            fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
        } 
        // if (filename.endsWith("_KEGG_enrichment.barplot_p.png") && !filename.startsWith("all_")) {
        //     let name = filename.replace("_KEGG_enrichment.barplot_p.png", "");
        //     keggNamesq.push(name)
        //     fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
        // } 
        // if (filename.endsWith("_KEGG_enrichment.dotplot_p.png") && !filename.startsWith("all_")) {
        //     let name = filename.replace("_KEGG_enrichment.dotplot_p.png", "");
        //     keggNamesq.push(name)
        //     fs.writeFileSync(outputPrefix + "/analyse/asset/" + filename, fs.readFileSync(filedir));
        // } 
    })
    renderImageDetail(goNamesq,outputPrefix + "/analyse/gokegg/go_gokegg.md","_go_enrich_q_0.05.png","{{details1}}")
    renderImageDetail(goNamesd,outputPrefix + "/analyse/gokegg/go_gokegg.md","_go_enrich.dotplot.png","{{details2}}")

    renderImageDetail(goNamesq,outputPrefix + "/analyse/gokegg/README.md","_go_enrich_q_0.05.png","{{details1}}")
    // renderImageDetail(goNamesd,outputPrefix + "/analyse/gokegg/README.md","_go_enrich.dotplot.png","{{details2}}")

    // renderImageDetail(keggNamesd,outputPrefix + "/analyse/gokegg/kegg_gokegg.md","_KEGG_enrichment.barplot-0.05.png","{{details1}}")
    console.log("keggNamesq:",keggNamesq)
    renderImageDetail(keggNamesq,outputPrefix + "/analyse/gokegg/kegg_gokegg.md","_KEGG_enrichment.dotplot-0.05.png","{{details2}}")
    // renderImageDetail(keggNamesd,outputPrefix + "/analyse/gokegg/kegg_gokegg.md","_KEGG_enrichment.barplot_p.png","{{details1}}")
    // renderImageDetail(keggNamesq,outputPrefix + "/analyse/gokegg/kegg_gokegg.md","_KEGG_enrichment.dotplot_p.png","{{details2}}")
}



function renderResultDetail(file,files,renderTemplate) {
    try {
        let data = fs.readFileSync(file, 'utf8');
        let detail = "";
        files.forEach(function(v,i,a){
            detail += `${v}<br />`
        })
        result = `<details><summary><b><u>结果文件</u></b></summary>${detail}</details>`
        console.log(result)
        data = data.replace(renderTemplate, result)
        fs.writeFileSync(file, data)
    } catch (err) {
        console.error(err)
    }
}
function buildResult() {
    let qualityFiles = []
    let contentFiles = []
    let readFiles = []
    let readBlast = []
    let reportBlast = []
    let coverageBlast = []
    let countAnalyse = []
    let gffResult = []
    let fpkmResult = []
    let filePath = "/data/output/report_result"
    let files = fs.readdirSync(filePath);
    files.forEach(filename => {
        if (filename.endsWith("_read_distribution_plot.txt") || filename.endsWith("_read_distribution_plot.png")){
            let name = "./result/blast/" + filename
            readBlast.push(name)
        }
        if (filename.endsWith(".report")) {
            let name = "./result/blast/" + filename
            reportBlast.push(name)
        }
        if (filename.includes("geneBodyCoverage")) {
            let name = "./result/blast/" + filename
            coverageBlast.push(name)
        }
        if (filename.includes("_freq_count")) {
            let name = "./result/count/" + filename
            countAnalyse.push(name)
        }
        if (filename.startsWith("gffcmp.")) {
            let name = "./result/struct/" + filename
            gffResult.push(name)
        }
        if (filename.startsWith("fpkm_")) {
            let name = "./result/count/" + filename
            fpkmResult.push(name)
        }
    })
    renderResultDetail(outputPrefix + "/analyse/struct/site.md",gffResult,"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/struct/README.md",gffResult,"{{result}}")

    renderResultDetail(outputPrefix + "/base/blast/result_blast.md",reportBlast,"{{result}}")
    renderResultDetail(outputPrefix + "/base/blast/cover_blast.md",coverageBlast,"{{result}}")
    renderResultDetail(outputPrefix + "/base/blast/area_blast.md",readBlast,"{{result}}")

    renderResultDetail(outputPrefix + "/analyse/count/count_analyse.md",countAnalyse,"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/count/README.md",countAnalyse,"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/count/fpkm_analyse.md",fpkmResult,"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/count/pca_analyse.md",["./result/count/pca_count.png","./result/count/pca_count.png"],"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/count/correlation_analyse.md",["./result/count/heatmap_count.pdf","./result/count/heatmap_count.png"],"{{result}}")
    let diffResult = []
    let goResult = []
    let dagResult = []
    let keggResult = []
    filePath = "/data/output/diff"
    files = fs.readdirSync(filePath)
    files.forEach(filename => {
        if (filename.includes("_PCA") || filename.includes("_pheatmap") || filename.includes("_volcano")
        || filename.startsWith("diffexpr-P")) {
            let name = "./result/diff/" + filename
            diffResult.push(name)
        }
        if (filename.includes("_GO") || filename.includes("_go_enrich_q_0.05")) {
            let name = "./result/diff/" + filename
            goResult.push(name)
        }
        if (filename.includes("_top10")) {
            let name = "./result/diff/" + filename
            dagResult.push(name)
        }
        if (filename.includes("_KEGG_enrichment.barplot-0.05") || filename.includes("_KEGG_enrichment.dotplot-0.05")) {
            let name = "./result/diff/" + filename
            keggResult.push(name)
        }
    })
    renderResultDetail(outputPrefix + "/analyse/gokegg/go_gokegg.md",goResult,"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/gokegg/go_dag_gokegg.md",dagResult,"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/gokegg/kegg_gokegg.md",keggResult,"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/gokegg/README.md",goResult,"{{result}}")

    renderResultDetail(outputPrefix + "/analyse/diff/README.md",diffResult,"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/diff/check_diff.md",diffResult,"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/diff/genom_diff.md",["./result/count/cluster.png","./result/count/cluster.pdf"],"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/diff/group_diff.md",["./result/count/veen.png","./result/count/veen.pdf"],"{{result}}")
    renderResultDetail(outputPrefix + "/analyse/diff/check_trend.md",["./result/diff/mfuzz.png","./result/diff/mfuzz.pdf"],"{{result}}")
    filePath = "/template/base/asset"
    files = fs.readdirSync(filePath);
    files.forEach(filename => {
        if (filename.endsWith("per_base_quality.png")){
            let name = "./result/origin/" + filename
            qualityFiles.push(name)
        }
        if (filename.endsWith("per_base_sequence_content.png")){
            let name = "./result/origin/" + filename
            contentFiles.push(name)
        }
        if (filename.endsWith("per_sequence_quality.png")){
            let name = "./result/origin/" + filename
            readFiles.push(name)
        }
    })
    renderResultDetail(outputPrefix + "/base/origin/quality_origin.md",qualityFiles,"{{result}}")
    renderResultDetail(outputPrefix + "/base/origin/content_origin.md",contentFiles,"{{result}}")
    renderResultDetail(outputPrefix + "/base/origin/reads_origin.md",contentFiles,"{{result}}")

    // rmats
    try {
        let rmats = []
        filePath = "/data/output/rmats_result"
        files = fs.readdirSync(filePath)
        console.log(files)
        files.forEach(filename => {
            console.log(filePath,filename)
            let cleanPath = path.join(filePath, filename);
            let stat = fs.statSync(cleanPath);
            if (stat.isDirectory()) {
                let resultFiles = fs.readdirSync(cleanPath);
                resultFiles.forEach(resultFileName => {
                    let name = path.join("./result/struct/",filename,resultFileName)
                    rmats.push(name)
                })
            }
        });
        renderResultDetail(outputPrefix + "/analyse/struct/rmats.md",rmats,"{{result}}")
    } catch (err) {
        console.error(err)
    }
}
module.exports = {
    copyCleanImageAndRender,
    buildResult
}
//copyImage("/data/output/report_result")
//暂时注释
//copyDiff("/data/output/diff")
// 挂载 output/ -> /data/output/

