---
title: "[백준] 1541 : 잃어버린 괄호"
date: "2020-03-08"
layout: post
draft: false
path: "/posts/baekjoons/1541/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1541번 문제 : 잃어버린 괄호"
---

# 1541번 : 잃어버린 괄호

👉 [문제 바로가기](https://www.acmicpc.net/problem/1541)



## 배경 지식
- `Greedy Algorithm` : 매 순간 최적의 선택으로 목표 단계까지 계산해 나가는 알고리즘

## 푼 방법
주어진 수식에서 괄호를 적절히 쳐서 식의 값을 최소로 만들어야 하는 문제이다.

'괄호를 친다'는 것은 '먼저 연산을 한다'는 뜻이고, 식의 값을 최소로 만드려면 양의 값보다 음의 값이 더 커야 한다.
즉, **'-'부호 뒤에 오는 '+'부호와 숫자들을 먼저 계산해주어 음의 값을 크게해 전체를 계산한다.**



## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <cstdlib>
#include <vector>
#include <string>
#include <deque>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	std::string equation;
	std::deque<int> nums; // deque의 pop_front() 메소드를 쓰기 위해 vector대신 사용하였다.
	std::deque<char> operators;
	std::string temp;
	
	std::cin >> equation;
	
	for (int i = 0; i < equation.size(); ++i) { // 숫자와 부호 분리
		if (equation[i] == '+' || equation[i] == '-') {
			operators.emplace_back(equation[i]);
			nums.emplace_back(atoi(temp.c_str()));
			temp.clear();
		}
		else
			temp += equation[i];
	}
	
	nums.emplace_back(atoi(temp.c_str()));

	int result = nums.front();
	nums.pop_front();
	
	while (operators.size() != 0) {
		if (operators.front() == '-') {
			operators.pop_front();
			
			int sum = nums.front();
			nums.pop_front();
			
			while (operators.front() != '-' && operators.size() > 0) {
				sum += nums.front();
				nums.pop_front();
				operators.pop_front();
			}
			
			result -= sum;
		}
		else {
			result += nums.front();
			nums.pop_front();
			operators.pop_front();
		}
	}

	std::cout << result << std::endl;
	
	return 0;
}
~~~
