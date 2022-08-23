import axios from "axios";

const v={
    strNum:0,
    baseUrl:"https://weatherfactory.biz/fet-"
}
const validChars=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","-"]
function allPossibleCombinations(input:string[], length:number, currentString:string) {
    if(currentString.length === length) {return [ currentString ];}
    const ret:string[] = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for(let i = 0; i < input.length; i++) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        ret.push(...allPossibleCombinations(input, length, currentString + input[i]));
    }
    return ret;
}
function sufToUrl(str:string):string{
    return v.baseUrl+str
}
async function testUrl(url:string):Promise<boolean>{
    if((await axios.get(url)).status!==404){
        return true

    }
    return false

}
 function sleep(ms:number){Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)};
 
function main(){for(let i=2;i<5;i++){
    const combos=allPossibleCombinations(validChars,i,"")
 combos.forEach((val)=>{
        sleep(500)
        console.log(sufToUrl(val))
         
        testUrl(sufToUrl(val)).then((worked)=>{
            if(worked){
                console.log(val)
                process.exit();
            }
        }).catch((reason)=>{
            console.log(reason)
        })
        }
        )
        
}}
main()