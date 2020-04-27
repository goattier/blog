---
title: "[백준] 11051 : 이항 계수 2"
date: "2020-03-20"
layout: post
draft: false
path: "/posts/baekjoons/11051/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 11051번 문제 : 이항 계수 2"
---

# 11051번 : 이항 계수 2

👉 [문제 바로가기](https://www.acmicpc.net/problem/11051)



## 배경 지식
- `이항 계수(Binomial coefficient)` : 주어진 크기 집합에서 원하는 개수만큼 **순서없이** 뽑는 조합의 가짓 수

- `동적계획법(Dynamic Programming)` : **복잡한 문제를 간단한 여러 개의 문제로 나누어 푸는 알고리즘**; 반복(중복)되는 작은 문제의 결과 값이 항상 같을 때 쓰인다. (분할정복(Divide and Conquer)과의 차이점)

- `메모이제이션(Memoization)` : 동적계획법에서 많이 쓰이는 테크닉으로, **계산된 값을 배열(캐시 : cache)에 저장(캐싱 : caching)한 후 필요한 경우 계산없이 호출**하여 쓰는 방법. (Top-Down DP over recursive function)

- `파스칼의 삼각형(Pascal's triangle)` : 이항계수를 삼각형 모양의 기하학적 형태로 배열한 구조
![파스칼의 삼각형](./Pascals_triangle.png)


## 푼 방법
백준 10050번(이항 계수 1) 문제의 후속작이다. 10050번 문제의 코드로는 통과할 수 없다. **N의 크기가 10에서 1000으로 증가**했기 때문에 기존 문제 정답의 키였던 **팩토리얼 재귀함수로는 time out**이 될 것이다. (나의 경우 백준에서 런타임 에러가 떴다.)

왜 time out이 될까? **중복 연산**이 일어나기 때문이다. 그래서 우리는 중복 연산을 피해 **처음 연산된 값을 저장하고, 다시 필요할 때 마다 꺼내 써야한다.(Bottom up DP)**


이번에는 이항 계수의 중요한 성질 중 하나고, 파스칼의 삼각형과 법칙에서 나온 수식을 사용했다.  
![이항 계수](./binomial_coefficient.png)



## 내 정답 코드 (C++)
~~~c
#include <iostream>

int bino_coef(int n, int k) {
    int dp[1001][1001] = {0, };

	for (int i = 1; i < n+1; ++i)
		dp[i][0] = 1; // 아무것도 고르지 않는 방법은 1가지 (k == 0)
		
	for (int i = 1; i < n+1; ++i)
		dp[i][i] = 1; // 모두 고르는 방법은 1가지 (n == k)

	for (int i = 1; i < n+1; ++i) {
		for (int j = 1; j < k+1; ++j) {
			if (i == j)
				continue;
			
			dp[i][j] = (dp[i-1][j] + dp[i-1][j-1]) % 10007;
		}
	}
	
	return dp[n][k];
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n, k;
	
	std::cin >> n >> k;
	
	std::cout << bino_coef(n,k) << std::endl;
    
    return 0;
}
~~~

### References
https://new93helloworld.tistory.com/220  
https://www.geeksforgeeks.org/tabulation-vs-memoization/  
https://coding-all.tistory.com/2  
https://ko.wikipedia.org/wiki/%ED%8C%8C%EC%8A%A4%EC%B9%BC%EC%9D%98_%EC%82%BC%EA%B0%81%ED%98%95  
https://shoark7.github.io/programming/algorithm/3-ways-to-get-binomial-coefficients  
https://elvrsn.blogspot.com/2015/02/memoization-vs-tabulation.html
