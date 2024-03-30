// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import '@account-abstraction/contracts/core/EntryPoint.sol';
import '@account-abstraction/contracts/interfaces/IAccount.sol';
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@openzeppelin/contracts/utils/Create2.sol";


contract EnsContract {
    using ECDSA for bytes32;

    struct DomainDetails {
        string domainName;
        string avatarURI;
        address owner;
    }

    mapping(string => address) public nameToAddress;
    mapping(string => DomainDetails) public domains;

    error DomainNotRegistered();
    error NameAlreadyTaken();
    error NotDomainOwner();

    event NameRegistered(address indexed owner, string domainName);
    event AvatarUpdated(address indexed owner, string domainName);


      // this is used to validate a valid EntryPoint and user operations
    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds)
    external view override returns (uint256 validationData){
        address recovered = ECDSA.recover(ECDSA.toEthSignedMessageHash(userOpHash), userOp.signature);
        return owner == recovered ? 0 : 1;
    }


    function entryPoint() public view virtual returns (IEntryPoint) {
        return _entryPoint;
    }


    /**
     * check current account deposit in the entryPoint
     */
    function getDeposit() public view returns (uint256) {
        return entryPoint().balanceOf(address(this));
    }

    /**
     * deposit more funds for this account in the entryPoint
     */
    function addDeposit(uint256 amount) public payable {
        entryPoint().depositTo{value: amount}(address(this));
        emit Deposit(msg.sender, amount);
    }

    /**
     * withdraw value from the account's deposit
     * @param withdrawAddress target to send to
     * @param amount to withdraw
     */
    function withdrawDepositTo(address payable withdrawAddress, uint256 amount) public onlyOwner {
       entryPoint().withdrawTo(withdrawAddress, amount);
        emit Transfered(msg.sender, withdrawAddress, amount);
    }


    function executeGaslessRegister(
        string memory _domainName,
        string memory _avatarURI,
        address _owner,
        bytes memory _signature
    ) public {
        // Verify signature
        require(
            verifySignature(_domainName, _avatarURI, _owner, _signature),
            "Invalid signature"
        );

        // Execute registration
        registerNameService(_domainName, _avatarURI, _owner);
    }

    function verifySignature(
        string memory _domainName,
        string memory _avatarURI,
        address _owner,
        bytes memory _signature
    ) internal pure returns (bool) {
        bytes32 messageHash = keccak256(
            abi.encodePacked(_domainName, _avatarURI, _owner)
        );
        address signer = messageHash.recover(_signature);
        return signer == _owner;
    }

    function registerNameService(
        string memory _domainName,
        string memory _avatarURI,
    ) internal {
        if (nameToAddress[_domainName] != address(0)) {
            revert NameAlreadyTaken();
        }
        nameToAddress[_domainName] = _owner;
        domains[_domainName] = DomainDetails(
            _domainName,
            _avatarURI,
        );

        emit NameRegistered(_owner, _domainName);
    }

    function updateDomainAvatar(
        string memory _domainName,
        string memory _avatarURI
    ) public {
        if (nameToAddress[_domainName] == address(0)) {
            revert DomainNotRegistered();
        }
        if (nameToAddress[_domainName] != msg.sender) {
            revert NotDomainOwner();
        }

        domains[_domainName].avatarURI = _avatarURI;
        emit AvatarUpdated(msg.sender, _domainName);
    }
}

contract EnsContractFactory{

    // create an account factory
    function  createEnsContract(address owner) external returns(address){
        
        bytes32 salt = bytes32(uint256(uint160(owner)));
        bytes memory bytecode = abi.encodePacked(type(EnsContract).creationCode, abi.encode(owner));
        
        address addr = Create2.computeAddress(salt, keccak256(bytecode));
        if (addr.code.length >0) {
            return addr;
        }
        
        return deploy(salt, bytecode);
        
    }

    function deploy(bytes32 salt, bytes memory bytecode) internal returns (address addr) {
        require(bytecode.length != 0, "Create2: bytecode length is zero");
        /// @solidity memory-safe-assembly
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
        }
        require(addr != address(0), "Create2: Failed on deploy");
    }
}