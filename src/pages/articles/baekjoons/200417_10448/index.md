---
title: "[백준] 10448 : 유레카 이론"
date: "2020-04-17"
layout: post
draft: false
path: "/posts/baekjoons/10448/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 10448번 문제 : 유레카 이론"
---

# 10448번 : 유레카 이론

👉 [문제 바로가기](https://www.acmicpc.net/problem/10448)


## 배경 지식
 - `브루트 포스(Brute Force)` : 완전탐색 알고리즘; **가능한 모든 경우의 수를 모두 탐색**하는 알고리즘


## 푼 방법
브루트 포스 알고리즘(Brute Force Algorithm)은 **매우 단순무식한 알고리즘**이다. 가능한 모든 경우를 다 체크해서 문제를 해결하는 방식인데, 이 문제에서 가능한 경우의 수가 브루트포스를 써도 될 정도여서 썼다.

**시간 면에서 매우 비효율적인 알고리즘**이니 **다른 알고리즘을 생각하는 출발점**으로 생각하거나 혹은 경우의 수가 적은 문제에서만 사용하면 된다.

문제에서 입력받는 수의 범위가 1000으로 그렇게 크지않으니까 **1000보다 작은 삼각수들을 모두 구해놓고 반복문을 돌려 3개의 삼각수를 조합**해본다. 3개의 삼각수의 합이 숫자로 표현되면 1을, 그렇지 않으면 0을 출력하면 된다.




## 내 정답 코드 (C++)

~~~c
#include <iostream>

int triangular_num[45], sum;

bool check(const int& n) {
	for (int i = 1; i < 45; ++i) {
		for (int j = 1; j < 45; ++j) {
			for (int k = 1; k < 45; ++k) {
				sum = triangular_num[i] + triangular_num[j] + triangular_num[k];
				
				if (sum == n)
					return true;
				else if (sum > n)
					break;
				else
					continue;
			}
		}
	}
	
	return false;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int t, n;
	
	std::cin >> t;
	
	for (int i = 1; i < 45; ++i)
		triangular_num[i] = (i*(i+1)) / 2;
	
	for (int i = 0; i < t; ++i) {
		std::cin >> n;
		
		std::cout << check(n) << '\n';
	}
	
	return 0;
}
~~~

### References
https://hcr3066.tistory.com/26  
https://ko.wikipedia.org/wiki/%EB%AC%B4%EC%B0%A8%EB%B3%84_%EB%8C%80%EC%9E%85_%EA%B3%B5%EA%B2%A9