---
title: "[백준] 9095 : 1, 2, 3 더하기"
date: "2020-05-22"
layout: post
draft: false
path: "/posts/baekjoons/9095/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 9095번 문제 : 1, 2, 3 더하기"
---

# 9095번 : 1, 2, 3 더하기

👉 [문제 바로가기](https://www.acmicpc.net/problem/9095)


## 배경 지식
 - `동적 계획법(Dynamic Programming = DP)` : 복잡한 문제를 간단한 여러 개의 문제로 나누어 푸는 방법 (하단의 References 참고)


## 푼 방법
동적계획법(Dynamic Programming)은 나중에 분할 정복, 메모이제이션 등과 알고리즘 파트에서 자세히 다룰 예정이다.

**재귀 함수**를 쓰며 **1, 2, 3을 각각 계속 더해주는 경우의 합**을 넘겨준다. **그 합이 입력받은 정수 n과 같으면 정수 n을 1, 2, 3의 합으로 나타내는 방법의 수를 저장하는 변수의 값을 1 증가**시키고 **총 방법의 수를 출력**한다.


## 내 정답 코드 (C++)
~~~c
#include <iostream>

int total;

void dp(int n, int sum) {
	if (sum == n) ++total;
	
	if (sum < n) {
		for (int i = 1; i <=3; ++i)
			dp(n, sum+i);
	}
	
	return;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int t, n;
	
	std::cin >> t;
	
	for (int i = 0; i < t; ++i) {
		total = 0;
		std::cin >> n;
		
		dp(n, 0);
		
		std::cout << total << '\n';
	}
	
	return 0;
}
~~~

### References
https://meteorbin.tistory.com/7  
https://syujisu.tistory.com/147  
https://lemeraldl.tistory.com/entry/%EB%8F%99%EC%A0%81-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8%EA%B3%BC-%EB%B6%84%ED%95%A0%EC%A0%95%EB%B3%B5%EC%9D%98-%EC%B0%A8%EC%9D%B4  
https://velog.io/@cyranocoding/%EB%8F%99%EC%A0%81-%EA%B3%84%ED%9A%8D%EB%B2%95Dynamic-Programming%EA%B3%BC-%ED%83%90%EC%9A%95%EB%B2%95Greedy-Algorithm-3yjyoohia5  
https://www.zerocho.com/category/Algorithm/post/584b979a580277001862f182  
https://ko.wikipedia.org/wiki/%EB%8F%99%EC%A0%81_%EA%B3%84%ED%9A%8D%EB%B2%95  