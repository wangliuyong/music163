{
    /* var TestObject = AV.Object.extend('TestObject');
    var testObject = new TestObject();
    testObject.save({
        words: 'Hello World!'
    }).then(function (object) {
        alert('LeanCloud Rocks!');
    }) */

    let APP_ID = "UWKeB0kQLsPnaNYwVmsdJgFs-gzGzoHsz";
    let APP_KEY = "rd6HiQxOsqHiIOtncKTYQPb9";

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
}
