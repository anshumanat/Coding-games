// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CodingGames {
    struct Game {
        string title;
        string description;
        address creator;
        uint256 rewardPool;
        bool active;
    }

    struct Submission {
        address participant;
        string solution;
        bool approved;
    }

    uint256 public gameCount = 0;
    mapping(uint256 => Game) public games;
    mapping(uint256 => Submission[]) public submissions;
    address public owner;

    event GameCreated(uint256 indexed gameId, string title, address creator);
    event SubmissionMade(uint256 indexed gameId, address participant, string solution);
    event SubmissionApproved(uint256 indexed gameId, address participant, uint256 reward);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action.");
        _;
    }

    modifier onlyGameCreator(uint256 gameId) {
        require(games[gameId].creator == msg.sender, "Only the game creator can perform this action.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createGame(string memory title, string memory description) public payable {
        require(msg.value > 0, "You must provide an initial reward pool.");

        games[gameCount] = Game({
            title: title,
            description: description,
            creator: msg.sender,
            rewardPool: msg.value,
            active: true
        });

        emit GameCreated(gameCount, title, msg.sender);
        gameCount++;
    }

    function submitSolution(uint256 gameId, string memory solution) public {
        require(games[gameId].active, "This game is no longer active.");

        submissions[gameId].push(Submission({
            participant: msg.sender,
            solution: solution,
            approved: false
        }));

        emit SubmissionMade(gameId, msg.sender, solution);
    }

    function approveSubmission(uint256 gameId, uint256 submissionIndex) public onlyGameCreator(gameId) {
        require(games[gameId].active, "This game is no longer active.");
        require(submissionIndex < submissions[gameId].length, "Invalid submission index.");

        Submission storage submission = submissions[gameId][submissionIndex];
        require(!submission.approved, "Submission is already approved.");

        submission.approved = true;
        uint256 reward = games[gameId].rewardPool;
        games[gameId].rewardPool = 0;
        games[gameId].active = false;

        payable(submission.participant).transfer(reward);
        emit SubmissionApproved(gameId, submission.participant, reward);
    }
}
