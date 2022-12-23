import "@stdlib/ownable";

struct Operation {
    to: Address;
    value: Int as coins;
    timeout: Int as uint32;
    bounce: Bool;
    mode: Int as uint8;
    body: Cell?;
    stateInit: StateInit?;
}

message OpRequest {
    queryId: Int as uint64;
    operation: Operation;
}

message OpDeploy {
    queryId: Int as uint64;
    requestor: Address;
}

message OpDeployReady {
    queryId: Int as uint64;
}

message OpExecute {
    queryId: Int as uint64;
    operation: Operation;
}

contract MultisigSigner with Ownable {

    // Multisig Address
    owner: Address;

    // Multisig members
    members: map[Address]Int;
    requiredWeight: Int;

    // Progress
    weight: Int = 0;
    ready: Bool = false;
    executed: Bool = false;

    // Request
    operation: Operation;
    
    init(owner: Address, members: map[Address]Int, requiredWeight: Int, operation: Operation) {
        self.owner = owner;
        self.members = members;
        self.requiredWeight = requiredWeight;
        self.operation = operation;
    }

    //
    // Deployment
    //

    receive(msg: OpDeploy) {
        send(SendParameters{
            bounce: false,
            to: msg.requestor,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors, 
            body: abi.pack_cell(OpDeployReady{queryId: msg.queryId})
        });
    }

    //
    // Voting
    //

    receive("YES") {

    }

    receive("NO") {

    }
}

contract Multisig {

    members: map[Address]Int;
    totalWeight: Int;
    requiredWeight: Int;

    init(members: map[Address]Int, totalWeight: Int, requiredWeight: Int) {
        self.members = members;
        self.totalWeight = totalWeight;
        self.requiredWeight = requiredWeight;
    }

    //
    // Request new transaction
    //

    receive(msg: OpRequest) {

        // Check sender
        let ctx: Context = context();
        let weight: Int? = self.members.get(ctx.sender);
        require(weight != null && weight!! > 0, "Not a member");
        
        // Create message
        let init: StateInit = initOf MultisigSigner(myAddress(), self.members, self.requiredWeight, msg.operation);
        let address: Address = contractAddress(init);
        send(SendParameters{
            value: 0, 
            to: address, 
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true,
            code: init.code,
            data: init.data
        });
    }

    //
    // Execute transaction
    //

    receive(msg: OpExecute) {

    }

    //
    // Get Methods
    //

    get fun member(address: Address): Int? {
        return self.members.get(address);
    }

    get fun members(): map[Address]Int {
        return self.members;
    }

    get fun totalWeight(): Int {
        return self.totalWeight;
    }

    get fun requiredWeight(): Int {
        return self.requiredWeight;
    }
}