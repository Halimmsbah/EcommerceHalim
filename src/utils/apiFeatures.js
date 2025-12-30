
export class ApiFeatures {

    constructor(mongooseQuery,searchQuery){
        this.mongooseQuery=mongooseQuery
        this.searchQuery=searchQuery 
    }

    pagination(){
    // string * number = nan== false
    if (this.searchQuery.page<=0) this.searchQuery.page=1 // عشان لو سالب يدي 1 برضو
    let pageNumber=this.searchQuery.page * 1 || 1 // ضربنا ف واحد عشان لو استرنج يدينا نان اللي هي فولس ف يطلع 1 اللي هي ديفولت
    let pageLimit=8
    
    this.pageNumber=pageNumber
    let skip = (pageNumber - 1) * pageLimit //عشان احسب اللي هسكبه ف المنتجات او الحاجه اللي هعرضها واحدد الجزء اللي بتعرض بس
    this.mongooseQuery.skip(skip).limit(pageLimit)
    return this//عشان اعرف اعمل دوت لاي حاجه بعد كدا زي كدا
    // pagination().sort()
    }

    filter(){
        let filterObj= {...this.searchQuery}
    let excludedFields=["page",'fields','sort','keyword']
    excludedFields.forEach( val=>{
        delete filterObj[val]
    })//عشان يحذف الكلمات دي 

    filterObj=JSON.stringify(filterObj)
    filterObj=filterObj.replace(/(gt|gte|lt|lte)/g, match => '$'+match )
    filterObj=JSON.parse(filterObj)

    this.mongooseQuery.find(filterObj)
    return this

    }

    sort(){
        if(this.searchQuery.sort){
            let sortBy= this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortBy)
        }
        return this
    }

    fields(){
        if(this.searchQuery.fields){
            let fields= this.searchQuery.sort.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this
    }

    search(){
        if(this.searchQuery.keyword){
            this.mongooseQuery.find({
                $or: [
                    { title : { $regex: this.searchQuery.keyword } },
                    { description : { $regex: this.searchQuery.keyword } },
                ]
            })
        }
        return this
    }
}