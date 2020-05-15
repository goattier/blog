---
title: "[백준] 1009 : 분산처리"
date: "2020-05-15"
layout: post
draft: false
path: "/posts/baekjoons/1009/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1009번 문제 : 분산처리"
---

# 1009번 : 분산처리

👉 [문제 바로가기](https://www.acmicpc.net/problem/1009)


## 배경 지식
 - `약간의 수학적 사고력`


## 푼 방법
**데이터 번호의 1의 자리 수가 그 데이터를 처리하는 컴퓨터의 번호 수**이다.

테스트 케이스를 입력받기 전에 미리 1부터 100까지의 정수에서 거듭제곱을 하면 나오는 1의 자리 숫자의 규칙성을 찾아 배열에 저장해놓고, 마지막 데이터 번호인 a 정수의 b 승을 입력받아 배열에서 


## 내 정답 코드 (C++)
~~~c
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int t, a, b;
	std::vector< std::vector<char> > data(101, std::vector<char>());
	
	for (int i = 1; i <= 100; ++i) {
		int temp = i % 10;
		
		while (std::find(data[i].begin(), data[i].end(), temp + '0') == data[i].end()) {
			data[i].emplace_back(temp + '0');
			temp *= i;
			temp %= 10;
		}
	}
	
	std::cin >> t;
	
	for (int i = 0; i < t; ++i) {
		std::cin >> a >> b;
		
		char result = data[a][ b % data[a].size() == 0 ? data[a].size() - 1 : (b % data[a].size()) - 1]; 
        
		result == '0' ? std::cout << 10 << '\n' : std::cout << result << '\n';
	}

	return 0;
}
~~~