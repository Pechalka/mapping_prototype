
function EditViewModel(model){
    var self = this;
    self.items = ko.mapping.fromJS(model);
    self.types = ['def', 'eql', 'none'];
    self.fromList = ['1', '5', '7'];

    self.to = ko.observable('');
    self.from = ko.observable('');


    self.delete = function(item){
        self.items.remove(item);
    };

    self.add = function(){
        var item = ko.mapping.fromJS({ to : self.to(), from : self.from(), type : 'def' });
        self.items.push(item);

        self.to('');    self.from('');
    }

    
    self.sync = ko.computed(function(){ 
        var data = { mappings : ko.toJS(self.items) };
        
        if (!self.sync) return; //first request not sent
        
        $.post('/mapping/update', data);
    
    }).extend({ throttle : 100 }); // fix many request

};