# ConvertGroovyToNodeJS

A converter tool ([**ConvertGroovyToNodeJS.ipynb**](ConvertGroovyToNodeJS.ipynb)) which is available to convert Groovy SmartApps into Node.js SmartApps. Currently, our tool can translate the fixed-format parts of Groovy SmartApps, such as definition/preference blocks, subscription/schedule functions, and device commands. To use the tool, the original Groovy SmartApps must first be translated into Standard Format Groovy source code using the [**AstNodeToScriptVisitor**](https://docs.groovy-lang.org/4.0.9/html/gapi/groovy/console/ui/AstNodeToScriptVisitor.html) class of the Groovy-console package. We tested our tool on the [**SmartAppZoo dataset**](https://github.com/SmartAppZoo/SmartAppZoo), and the [**Results**](Results) folder contains the converted SmartApps. Our tool accurately converted approximately 50 simple apps. We need the help of the community to improve the converter tool by enabling it to translate the other user-defined functions of the Groovy SmartApps into the equivalent functions in Node.js. This will require collaborative efforts and contributions from the research community to enhance the capabilities of our tool. We invite researchers and practitioners to contribute to this project.

## Citing this work

``` 
@inproceedings{SmartAppZoo,
title = {Poster Abstract: SmartAppZoo: A Repository of SmartThings Apps for IoT Benchmarking},
author = {Wang, Zhaohui and Luo, Bo and Li, Fengjun},
booktitle = {Proceedings of the 8th ACM/IEEE Conference on Internet of Things Design and Implementation},
year = {2023},
location = {San Antonio, TX, USA},
pages = {448–449},
series = {IoTDI '23}
}
``` 

## Warning

When visiting the [**Results**](Results) folder via a browser, you may receive the following warning:

```
Sorry, we had to truncate this directory to 1,000 files. 2,526 entries were omitted from the list.
```

This is a common practice on Github. Github limits the number of files that can be listed in the webview to 1000. The warning only appears when using a browser, but you can still fork, clone, or download the repository without issues.

## Contributing

We welcome submissions of issues and pull requests. we need the help of the community to improve and perfect the tool. 


## Types of Markings

interesting: if an app is a possible use case for us to use for mutation
